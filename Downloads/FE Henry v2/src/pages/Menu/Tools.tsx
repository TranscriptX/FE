import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Import Navbar

const Tools = () => {
  return (
    <>
      {/* Menambahkan Navbar */}
      <Navbar currentPage="All Tools" />

      <div className="bg-gray-100">
        {/* Main Content */}
        <div className="flex justify-center space-x-6 p-12">
          <div className="w-60 h-60 border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-200 hover:cursor-pointer">
            <h3 className="text-center font-bold text-lg">Document Summarizer</h3>
            <img src="document-icon.png" alt="Document Icon" className="mx-auto my-4" />
            <Link to="/document-summarizer" className="text-center block text-blue-600 hover:underline">
              Go to Summarizer
            </Link>
          </div>

          <div className="w-60 h-60 border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-200 hover:cursor-pointer">
            <h3 className="text-center font-bold text-lg">Video or Audio Transcription</h3>
            <img src="audio-icon.png" alt="Audio Icon" className="mx-auto my-4" />
            <Link to="/audio-video-transcription" className="text-center block text-blue-600 hover:underline">
              Go to Transcription
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tools;
