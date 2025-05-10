import { useState } from "react";
import Navbar from "../../components/Navbar"; // Import Navbar

const DocumentSummarizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workspaceTitle, setWorkspaceTitle] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [summaryResult, setSummaryResult] = useState("");
  const [isSummarized, setIsSummarized] = useState(false);

  // States for pop-up modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSummarize = () => {
    setSummaryResult("Pak Henry Lucky panutanku"); // Placeholder summary
    setIsSummarized(true);
  };

  const handleShare = () => {
    setShowShareModal(true); // Show the share confirmation modal
  };

  const handleExport = () => {
    setShowExportModal(true); // Show the export confirmation modal
  };

  const closeModal = () => {
    setShowShareModal(false);
    setShowExportModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar currentPage="All Tools" />

      <div className="bg-gray-100 min-h-screen flex items-start justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[400px] mt-4">
          <h1 className="text-3xl font-bold text-center mb-1">Document Summarizer</h1>

          {/* Deskripsi */}
          <p className="text-center text-gray-500 mb-4">Summarize your document with the power of AI</p>

          {/* File Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold mb-1">Upload Document</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".txt,.doc,.docx,.pdf"
              className="block w-full text-gray-700 border border-gray-300 rounded-md p-3 shadow-sm"
            />
            {file && <div className="mt-2 text-center text-sm text-gray-500">{file.name}</div>}
          </div>

          {/* Keterangan file types */}
          <p className="text-sm text-gray-500 mb-4">Supported extensions: .txt, .doc, .docx, .pdf</p>

          {/* Workspace Title */}
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold mb-1">Workspace Title</label>
            <input
              type="text"
              placeholder="Enter workspace title"
              value={workspaceTitle}
              onChange={(e) => setWorkspaceTitle(e.target.value)}
              className="block w-full text-gray-700 border border-gray-300 rounded-md p-3"
            />
          </div>

          {/* Workspace Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">Workspace Description</label>
            <textarea
              placeholder="Enter workspace description"
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value)}
              className="block w-full text-gray-700 border border-gray-300 rounded-md p-3"
              rows={4}
            />
          </div>

          {/* Summarize Button */}
          {!isSummarized && (
            <div className="flex justify-end mb-4">
              <button
                onClick={handleSummarize}
                className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Summarize
              </button>
            </div>
          )}

          {/* Summary Result */}
          {isSummarized && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Summary Result:</h2>
              <textarea
                value={summaryResult}
                readOnly
                className="w-full p-4 border border-gray-300 rounded-md text-gray-700"
                rows={6}
              />
              {/* Share and Export buttons */}
              <div className="mt-4 flex space-x-4 justify-end">
                <button
                  onClick={handleShare}
                  className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Share
                </button>
                <button
                  onClick={handleExport}
                  className="py-2 px-6 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Export
                </button>
              </div>
            </div>
          )}
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
    </>
  );
};

export default DocumentSummarizer;
