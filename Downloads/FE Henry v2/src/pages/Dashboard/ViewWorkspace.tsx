import { useState } from "react";
import Navbar from "../../components/Navbar";
// import { FaEye, FaEdit, FaLink, FaDownload, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewWorkspace = () => {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [summaryResult, setSummaryResult] = useState("");

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleExport = () => {
    setShowExportModal(true);
    navigate("/ExportWorkspace");
  };

  const handleSummarize = () => {
    // Simulating summarization process, add logic for real summarization
    setSummaryResult("Summarized text result goes here...");
  };

  const closeModal = () => {
    setShowShareModal(false);
    setShowExportModal(false);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Navbar currentPage="Dashboard" />

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[1000px]">
          <h1 className="text-3xl font-bold text-center mb-6">Lorem Ipsum</h1>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Author</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  defaultValue="John Doe"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Created Date</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  defaultValue="26-Apr-2025"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Original File Name</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  type="text"
                  defaultValue="file_name.mp3"
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
                  defaultValue="transcriptx.com/shared/link"
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
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              readOnly
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Result</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              defaultValue="Transcription result"
              readOnly
            />
          </div>

          {/* If summary result is available, move buttons below */}
          {summaryResult && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Summary Result:</h2>
              <textarea
                value={summaryResult}
                readOnly
                className="w-full p-4 border border-gray-300 rounded-md text-gray-700"
                rows={6}
              />
            </div>
          )}

          <div className={`flex justify-end space-x-4 mb-4 ${summaryResult ? "mt-4" : ""}`}>
            <button
              className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleExport}
            >
              Export
            </button>
            <button
              className="py-2 px-6 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              onClick={handleSummarize}
            >
              Summarize
            </button>
            <button
              className="py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => navigate("/edit-workspace/1")}
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

      {/* Modal Pop-up for Share */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold text-center mb-4">Successfully Created Share Link</h2>
            <p className="text-center mb-4">transcriptx/shared/123</p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pop-up for Export */}
      {showExportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold text-center mb-4">Successfully Export Workspace</h2>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="py-2 px-6 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pop-up for Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold text-center mb-4">Confirmation</h2>
            <p className="text-center mb-4">Are you sure you want to delete the workspace? This action is irreversible.</p>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewWorkspace;
