import { useState } from "react";
import Navbar from "../../components/Navbar"; // Import Navbar

const AudioVideoTranscription = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workspaceTitle, setWorkspaceTitle] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [transcriptionResult, setTranscriptionResult] = useState("");
  const [summarizedText, setSummarizedText] = useState(""); // For storing the summarized text
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false); // To track if summarize was clicked

  // States for pop-up modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTranscribe = () => {
    setTranscriptionResult("Transcription of the audio/video will be here..."); // Placeholder transcription
    setIsTranscribed(true);
  };

  const handleSummarize = () => {
    setSummarizedText("This is the summarized text based on the transcription."); // Placeholder summarize
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

      <div className="bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 min-h-screen flex items-start justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[450px] mt-8 transition-all duration-300">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Audio/Video Transcription</h1>

          {/* Deskripsi */}
          <p className="text-center text-gray-500 mb-6 text-lg">Transcribe your audio/video with the power of AI</p>

          {/* File Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Upload Audio/Video</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="audio/*,video/*"
              className="block w-full text-gray-700 border-2 border-gray-300 rounded-lg p-3 shadow-sm hover:border-indigo-500 focus:ring-2 focus:ring-indigo-600"
            />
            {file && <div className="mt-2 text-center text-sm text-gray-500">{file.name}</div>}
          </div>

          {/* Keterangan file types */}
          <p className="text-center text-sm text-gray-500 mb-6">Supported extensions: .mp3, .wav, .mp4, .mov, .avi</p>

          {/* Workspace Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Workspace Title</label>
            <input
              type="text"
              placeholder="Enter workspace title"
              value={workspaceTitle}
              onChange={(e) => setWorkspaceTitle(e.target.value)}
              className="block w-full text-gray-700 border-2 border-gray-300 rounded-lg p-3 shadow-sm hover:border-indigo-500 focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {/* Workspace Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Workspace Description</label>
            <textarea
              placeholder="Enter workspace description"
              value={workspaceDescription}
              onChange={(e) => setWorkspaceDescription(e.target.value)}
              className="block w-full text-gray-700 border-2 border-gray-300 rounded-lg p-3 shadow-sm hover:border-indigo-500 focus:ring-2 focus:ring-indigo-600"
              rows={4}
            />
          </div>

          {/* Transcribe Button */}
          {!isTranscribed && (
            <div className="flex justify-end mb-6">
              <button
                onClick={handleTranscribe}
                className="py-3 px-8 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:outline-none transition-all duration-300"
              >
                Transcribe
              </button>
            </div>
          )}

          {/* Transcription Result */}
          {isTranscribed && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Transcription Result:</h2>
              <textarea
                value={transcriptionResult}
                readOnly
                className="w-full p-4 border-2 border-gray-300 rounded-md text-gray-700 mb-6"
                rows={6}
              />

              {/* Summarize Button */}
              {!isSummarized && (
                <div className="flex justify-end mb-6">
                  <button
                    onClick={handleSummarize}
                    className="py-3 px-8 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all"
                  >
                    Summarize
                  </button>
                </div>
              )}

              {/* Summarized Result */}
              {isSummarized && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Summarized Result:</h2>
                  <textarea
                    value={summarizedText}
                    readOnly
                    className="w-full p-4 border-2 border-gray-300 rounded-md text-gray-700 mb-6"
                    rows={6}
                  />
                </div>
              )}

              {/* Share and Export buttons */}
              <div className="mt-4 flex space-x-4 justify-end">
                <button
                  onClick={handleShare}
                  className="py-3 px-8 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all"
                >
                  Share
                </button>
                <button
                  onClick={handleExport}
                  className="py-3 px-8 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 transition-all"
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

export default AudioVideoTranscription;
