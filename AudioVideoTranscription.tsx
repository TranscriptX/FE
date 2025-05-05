import { useState } from "react";
import Navbar from "../../components/Navbar"; // Import Navbar

const AudioVideoTranscription = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workspaceTitle, setWorkspaceTitle] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [transcriptionResult, setTranscriptionResult] = useState('');
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSummarize = () => {
    setShowConfirmation(true);  // Show confirmation dialog
  };

  const confirmSummarize = () => {
    setTranscriptionResult('Pak Henry Lucky panutanku');
    setIsTranscribed(true);
    setShowConfirmation(false);
  };

  return (
    <>
      {/* Menambahkan Navbar */}
      <Navbar currentPage="All Tools" />

      <div className="bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">VIDEO/AUDIO TRANSCRIPTION</h1>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".mp4,.mp3,.wav"
        />
        <div>{file && file.name}</div>

        <input
          type="text"
          placeholder="Workspace Title"
          value={workspaceTitle}
          onChange={(e) => setWorkspaceTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Workspace Description"
          value={workspaceDescription}
          onChange={(e) => setWorkspaceDescription(e.target.value)}
        />

        <button onClick={handleSummarize}>Summarize</button>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirmation</h2>
              <p>Are you sure you want to summarize the result? You will be redirected and cannot go back.</p>
              <button onClick={confirmSummarize} className="bg-green-500 text-white py-2 px-6 mt-4">
                OK
              </button>
              <button onClick={() => setShowConfirmation(false)} className="bg-red-500 text-white py-2 px-6 mt-4">
                Cancel
              </button>
            </div>
          </div>
        )}

        {isTranscribed && (
          <div>
            <h2>Transcription Result:</h2>
            <textarea value={transcriptionResult} readOnly />
          </div>
        )}
      </div>
    </>
  );
};

export default AudioVideoTranscription;
