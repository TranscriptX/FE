import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import checkSign from "../../assets/check-sign.svg";

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
            <img src={checkSign} alt="check" className="size-[96px]" />
            
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
              className="py-2 px-6 bg-ijo text-black rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-[0_2px_3px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              Copy Link
            </button>
            
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
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-black font-bold px-5 py-2 rounded hover:bg-gray-400 shadow"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white font-bold px-5 py-2 rounded hover:bg-red-700 shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[1000px]">
          <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Author</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  defaultValue={author}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Created Date</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  defaultValue={formattedDate}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Original File Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  defaultValue={originalFileName}
                  readOnly
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Shared Link</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  defaultValue={sharedUrl}
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              defaultValue={description}
              readOnly
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Result</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              defaultValue={result}
              readOnly
            />
          </div>

          <div className="flex justify-end space-x-4 mb-4">
            <button
              className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => navigate("/ExportWorkspace", { state: data })}
            >
              Export
            </button>
            <button
              className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={handleEditWorkspace}
            >
              Edit
            </button>
            <button
              className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600"
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
