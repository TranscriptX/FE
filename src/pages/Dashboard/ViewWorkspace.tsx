import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import checkSign from "../../assets/check-sign.svg";
import Copy from "../../assets/copy.svg"

const ViewWorkspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {};

  const {
    title = "Untitled",
    author = "Unknown",
    createdDate = "-",
    originalFileName = "-",
    sharedUrl = "-",
    description = "-",
    result = "-",
    type = "Transcription",
    id = null, // Assume we have an id for workspace
  } = data;

  // Format the createdDate to a readable format if it's not '-'
  const formattedDate = createdDate !== "-" ? new Date(createdDate).toLocaleDateString() : "-";

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Simulating a workspace list and a function to handle deletion
  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const closeModal = () => {
    setShowShareModal(false);
    setShowDeleteModal(false);
  };

  const handleEditWorkspace = () => {
    navigate(`/edit-workspace/${data.id}`);
  };

  const confirmDelete = () => {
    // Handle deletion logic here, maybe removing the workspace from an API or state
    console.log(`Workspace with ID ${id} deleted`);

    // After deletion, we close the modal and navigate back to Dashboard or other page
    setShowDeleteModal(false);
    navigate("/dashboard"); // Navigate back to the dashboard or workspace list
  };

  const inputStyle = "font-sans w-full px-[4px] py-[6px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none";
  const textStyle = "block text-black font-[600]"
  const formStyle = "mb-[18px]"

  // Display fallback if no state provided (e.g., user refreshes)
  if (!location.state) {
    return (
      <div className="text-center mt-10 text-red-500">
        No workspace data provided. Go back to Dashboard.
      </div>
    );
  }

  return (
    <>
      <Navbar currentPage="Dashboard" />

      {/* Modal Pop-up for Share */}
      {showShareModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0">Successfully Created Share Link</h2>
            <img src={checkSign} alt="check" className="size-[96px] mb-[12px]" />
            
            <div className="flex flex-row items-center">
              {/* Textbox for the link */}
              <textarea
                value="transcriptx/shared/123"  // Link yang akan ditampilkan
                readOnly  // Agar tidak bisa diubah oleh pengguna
                className="w-[300px] p-3 border-grey rounded-md text-center mb-4"
                rows={1}  // Menyesuaikan tinggi textarea
              />
              
              {/* Copy Link Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText('transcriptx/shared/123') // Link yang akan disalin
                    .then(() => {
                      alert("Link copied to clipboard!"); // Memberikan konfirmasi ke pengguna
                    })
                    .catch(error => {
                      alert("Failed to copy link. Please try again."); // Menangani error jika gagal
                    });
                }}
                className="py-2 px-6 bg-white border-l-2 border-r-0 border-t-0 border-b-0 text-black rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer"
              >
                <img src={Copy} alt="copy" className="size-[14px]" />
              </button>
            </div>
              
              <p>____________________________________________</p>
              <button
                onClick={closeModal}
                className="bg-ijo text-color_primary font-bold px-[20px] py-[6px] mb-[8px] ml-auto mr-[10px] shadow border-none rounded hover:bg-ijoHover transition-all duration-300 ease-in-out shadow-[0_2px_3px_rgba(0,0,0,0.25)] cursor-pointer"
              >
                OK
              </button>              
          </div>
        </div>
      )}

      {/* Modal Delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 opacity-70 z-49 bg-color_primary"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center">
            <h2 className="text-xl font-bold mb-0 text-red-600">Are you sure?</h2>
            <img src={checkSign} alt="check" className="size-[96px]" />
            <p className="break-all max-w-[300px] text-center mb-4 mt-2 text-gray-700">
              Do you want to delete this workspace? 
              <br/>
              This action cannot be undone.
            </p>
            <p>____________________________________________</p>
            <div className="flex justify-end space-x-[8px] mb-[8px]">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-color_secondary text-black font-bold px-[12px] py-[4px] rounded-[4px] border-grey hover:bg-dark_grey cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-[red] text-white font-bold px-[12px] py-[4px] rounded-[4px] border-[red] hover:bg-darker_red hover:border-darker_red cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-3xl font-bold text-center mt-[100px]">{title}</h1>
        <div className="bg-white p-[60px] w-full max-w-[1000px]">
          
          <div className="grid grid-cols-2 gap-[36px] mb-6">
            <div>
              <div className={formStyle}>
                <label className={textStyle}>Author</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue={author}
                  readOnly
                />
              </div>
              <div className={formStyle}>
                <label className={textStyle}>Created Date</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue={formattedDate}
                  readOnly
                />
              </div>
              <div className={formStyle}>
                <label className={textStyle}>Original File Name</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue={originalFileName}
                  readOnly
                />
              </div>
            </div>

            <div>
              <div className={formStyle}>
                <label className={textStyle}>Shared Link</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue={sharedUrl}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className={formStyle}>
            <label className={textStyle}>Description</label>
            <textarea
              className={inputStyle}
              rows={4}
              defaultValue={description}
              readOnly
            />
          </div>

          <div className={formStyle}>
            <label className={textStyle}>Result</label>
            <textarea
              className={inputStyle}
              rows={4}
              defaultValue={result}
              readOnly
            />
          </div>

          <div className="flex justify-end space-x-[12px]">
            <button
              className="bg-ijo text-white font-bold px-[24px] py-[4px] rounded-[4px] border-ijo hover:bg-ijoHover hover:border-ijoHover cursor-pointer"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="bg-minty text-white font-bold px-[24px] py-[4px] rounded-[4px] border-minty hover:bg-minty_dark hover:border-minty_dark cursor-pointer"
              onClick={() => navigate("/ExportWorkspace", { state: data })}
            >
              Export
            </button>
            <button
              className="bg-kuning text-white font-bold px-[24px] py-[4px] rounded-[4px] border-kuning hover:bg-kuning_dark hover:border-kuning_dark cursor-pointer"
              onClick={handleEditWorkspace}
            >
              Edit
            </button>
            <button
              className="bg-[red] text-white font-bold px-[24px] py-[4px] rounded-[4px] border-[red] hover:bg-darker_red hover:border-darker_red cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default ViewWorkspace;
