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

  const inputStyle = "font-sans w-[480px] px-[4px] py-[12px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none";

  return (
    <>
      <Navbar currentPage="Dashboard" />

      {/* Modal Pop-up for Submit Confirmation */}
      {showSubmitModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0 max-w-[300px]">Are you sure you want to submit?</h2>
            <p className="text-center mt-4">Ensure all updates are correct before finalizing.</p>
            <p>____________________________________________</p>
            <div className="flex justify-end space-x-[8px] mb-[8px]">
              <button
                onClick={closeModal}
                className="bg-color_secondary text-black font-bold px-[12px] py-[4px] rounded-[4px] border-grey hover:bg-dark_grey cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="bg-ijo text-white font-bold px-[12px] py-[4px] rounded-[4px] border-ijo hover:bg-ijoHover hover:border-ijoHover cursor-pointer"
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
          <div className="bg-pop rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl max-w-[400px] font-bold mb-0">Are you sure you want to stop sharing?</h2>
            <p>____________________________________________</p>
            <div className="flex justify-end space-x-[8px] mb-[8px]">
              <button
                onClick={closeModal}
                className="bg-color_secondary text-black font-bold px-[12px] py-[4px] rounded-[4px] border-grey hover:bg-dark_grey cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmStopShare}
                className="bg-[red] text-white font-bold px-[12px] py-[4px] rounded-[4px] border-[red] hover:bg-darker_red hover:border-darker_red cursor-pointer"
              >
                Stop Share
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-3xl font-bold text-center mt-[100px]">EDIT WORKSPACE</h1>
        <div className="bg-white p-[60px] w-full max-w-[1000px]">
        
          <div className="grid grid-cols-2 gap-[24px] mb-6">
            <div>
              <div className="mb-4">
                <label className="block text-black font-[600]">Title</label>
                <input
                  className={inputStyle}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-black font-[600]">Shared Link</label>
                <input
                  className={inputStyle}
                  type="text"
                  value={sharedLink}
                  onChange={(e) => setSharedLink(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-[16px]">
            <label className="block text-black font-[600]">Description</label>
            <textarea
              className="font-sans w-full px-[4px] py-[12px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-end space-y-[8px] mt-[16px]">
            <div className="flex space-x-[8px]">
              <button
                onClick={handleCancel}
                className="bg-[red] text-white font-bold px-[32px] py-[6px] rounded-[4px] border-[red] hover:bg-darker_red hover:border-darker_red cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-ijo text-white font-bold px-[32px] py-[6px] rounded-[4px] border-ijo hover:bg-ijoHover hover:border-ijoHover cursor-pointer"
              >
                Submit
              </button>
            </div>
            <button
              onClick={handleStopShare}
              className="bg-jingga text-white font-bold px-[20px] py-[6px] rounded-[4px] border-jingga hover:bg-jingga_hover hover:border-jingga_hover cursor-pointer"
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
