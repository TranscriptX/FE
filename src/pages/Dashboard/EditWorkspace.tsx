import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const EditWorkspace = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Lorem Ipsum");
  const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const [sharedLink, setSharedLink] = useState("transcriptx.com/shared/123");

  // Modal visibility states
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showStopShareModal, setShowStopShareModal] = useState(false);

  const handleCancel = () => {
    navigate("/Dashboard");
  };

  const handleSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleStopShare = () => {
    setShowStopShareModal(true);
  };

  // Modal close
  const closeModal = () => {
    setShowSubmitModal(false);
    setShowStopShareModal(false);
  };

  // Confirm actions
  const confirmSubmit = () => {
    // Logic for submit
    console.log("Workspace submitted");
    setShowSubmitModal(false);
    navigate("/Dashboard"); // Navigate to Dashboard or other page after submit
  };

  const confirmStopShare = () => {
    // Logic for stop sharing
    console.log("Workspace sharing stopped");
    setShowStopShareModal(false);
    navigate("/Dashboard"); // Navigate after stopping the share
  };

  return (
    <>
      <Navbar currentPage="Dashboard" />

      {/* Modal Pop-up for Submit Confirmation */}
      {showSubmitModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0">Are you sure you want to submit?</h2>
            <p className="text-center mt-4">Ensure all updates are correct before finalizing.</p>
            <p>____________________________________________</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black font-bold px-5 py-2 rounded hover:bg-gray-400 shadow"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="bg-green-500 text-white font-bold px-5 py-2 rounded hover:bg-green-600 shadow"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pop-up for Stop Share Confirmation */}
      {showStopShareModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0">Are you sure you want to stop sharing?</h2>
            <p>____________________________________________</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-black font-bold px-5 py-2 rounded hover:bg-gray-400 shadow"
              >
                Cancel
              </button>
              <button
                onClick={confirmStopShare}
                className="bg-red-600 text-white font-bold px-5 py-2 rounded hover:bg-red-700 shadow"
              >
                Stop Share
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[1000px]">
          <h1 className="text-3xl font-bold text-center mb-6">Edit Workspace</h1>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Title</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Shared Link</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  value={sharedLink}
                  onChange={(e) => setSharedLink(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-end space-y-4 mt-6">
            <div className="flex space-x-4">
              <button
                onClick={handleCancel}
                className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
            <button
              onClick={handleStopShare}
              className="py-2 px-6 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Stop Share
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default EditWorkspace;
