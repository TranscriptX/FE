import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const EditWorkspace = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Lorem Ipsum");
  const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const [sharedLink, setSharedLink] = useState("transcriptx.com/shared/123");

  const handleCancel = () => {
    navigate("/Dashboard");
  };

  const handleSubmit = () => {
    // Logic for submit
  };

  const handleStopShare = () => {
    // Logic for stop sharing
  };

  return (
    <>
      <Navbar currentPage="Dashboard" />

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
