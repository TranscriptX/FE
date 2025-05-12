import { useState } from "react";
import checkSign from "../../assets/check-sign.svg";
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
    
      {/* Modal Pop-up for Share */}
      {showShareModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen">
          </div>
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



      {/* Modal Pop-up for Export */}
      {showExportModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen">
          </div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0">Successfully Export Workspace</h2>
            <img src={checkSign} alt="check" className="size-[96px]" />
            <p>____________________________________________</p>
            <button
              onClick={closeModal}
              className="bg-yellow-500 text-white font-bold px-[20px] py-[6px] mb-[8px] ml-auto mr-[10px] shadow border-none rounded hover:bg-yellow-600 transition-all duration-300 ease-in-out shadow-[0_2px_3px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}


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
                disabled={!file} // Disable button if no file is uploaded
                className={`py-2 px-6 ${!file ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-md hover:${file ? 'bg-blue-700' : 'bg-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                Summarize
              </button>
            </div>
          )}

          {/* Display message to upload file if none is selected */}
          {!file && !isSummarized && (
            <p className="text-center text-biru text-sm mt-2">Please upload a document to summarize.</p>
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

      
    </>
  );
};

export default DocumentSummarizer;
