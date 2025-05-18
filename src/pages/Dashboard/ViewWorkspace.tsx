import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import checkSign from "../../assets/check-sign.svg";
import Copy from "../../assets/copy.svg";
import API_PATH from "../../api/API_PATH";
import { getUserIdFromToken } from "../../utils/Helper";

const ViewWorkspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // State untuk data workspace, loading, error, modal
  const [workspaceData, setWorkspaceData] = useState<any>(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Ambil token dan userID dari localStorage/helper
  const token = localStorage.getItem("token");
  const userID = token ? getUserIdFromToken(token) : null;

  // Fetch data jika belum ada dan ada id + token + userID
  useEffect(() => {
    if (!workspaceData && id && token && userID) {
      setLoading(true);
      fetch(`${API_PATH}/api/workspaces/detail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ workspaceID: id, userID }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Workspace not found");
          return res.json();
        })
        .then((data) => {
          setWorkspaceData(data.payload);
          setError(null);
        })
        .catch((err) => setError(err.message || "Failed to load workspace"))
        .finally(() => setLoading(false));
    }
  }, [id, workspaceData, token, userID]);

  // Format tanggal tampil
  const formattedDate =
    workspaceData?.createdDate && workspaceData.createdDate !== "-"
      ? new Date(workspaceData.createdDate).toLocaleDateString()
      : "-";

  // Modal handlers
  const handleDelete = () => setShowDeleteModal(true);
  const handleShare = () => setShowShareModal(true);
  const closeModal = () => {
    setShowShareModal(false);
    setShowDeleteModal(false);
  };

  // Edit workspace handler
  const handleEditWorkspace = () => {
    if (workspaceData?.id) {
      navigate(`/edit-workspace/${workspaceData.id}`, { state: workspaceData });
    }
  };

  // Confirm delete handler (placeholder logic)
  const confirmDelete = () => {
    // TODO: implement API delete request here
    console.log(`Workspace with ID ${workspaceData?.id} deleted`);
    setShowDeleteModal(false);
    navigate("/dashboard");
  };

  // Copy link handler for share modal
  const copyLinkToClipboard = () => {
    if (workspaceData?.sharedLink) {
      navigator.clipboard
        .writeText(workspaceData.sharedLink)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link. Please try again."));
    } else {
      alert("No link available to copy.");
    }
  };

  // Styling classes (sama dengan yang kamu berikan)
  const inputStyle =
    "font-sans w-full px-[4px] py-[6px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none";
  const textStyle = "block text-black font-[600]";
  const formStyle = "mb-[18px]";

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar currentPage="Dashboard" />
        <div className="text-center mt-10">Loading workspace data...</div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar currentPage="Dashboard" />
        <div className="text-center mt-10 text-red-600">Error: {error}</div>
      </>
    );
  }

  // No data state
  if (!workspaceData) {
    return (
      <>
        <Navbar currentPage="Dashboard" />
        <div className="text-center mt-10 text-red-600">
          No workspace data available. Go back to Dashboard.
        </div>
      </>
    );
  }

  // Destruct data workspace untuk UI
  const {
    title = "Untitled",
    author = "Unknown",
    originalFileName = "-",
    sharedLink = "",
    description = "-",
    transcription = "-",
  } = workspaceData;

  return (
    <>
      <Navbar currentPage="Dashboard" />

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 opacity-70 z-49 bg-color_primary"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0">Successfully Created Share Link</h2>
            <img src={checkSign} alt="check" className="size-[96px] mb-[12px]" />
            <div className="flex flex-row items-center">
              <textarea
                value={sharedLink}
                readOnly
                className="w-[300px] p-3 border-grey rounded-md text-center mb-4"
                rows={1}
              />
              <button
                onClick={copyLinkToClipboard}
                className="py-2 px-6 bg-white border-l-2 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer"
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 opacity-70 z-49 bg-color_primary"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center">
            <h2 className="text-xl font-bold mb-0 text-red-600">Are you sure?</h2>
            <img src={checkSign} alt="check" className="size-[96px]" />
            <p className="break-all max-w-[300px] text-center mb-4 mt-2 text-gray-700">
              Do you want to delete this workspace? <br />
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
                <input className={inputStyle} type="text" defaultValue={author} readOnly />
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
                  defaultValue={sharedLink}
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
              defaultValue={transcription}
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
              onClick={() => navigate("/ExportWorkspace", { state: workspaceData })}
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
