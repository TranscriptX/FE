import { useState } from "react";
import checkSign from "../../assets/check-sign.svg";
import Navbar from "../../components/Navbar"; // Import Navbar
import Copy from "../../assets/copy.svg";

const DocumentSummarizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [workspaceTitle, setWorkspaceTitle] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [summaryResult, setSummaryResult] = useState("");
  const [isSummarized, setIsSummarized] = useState(false);

  // States for pop-up modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const inputStyle = "font-sans w-[480px] px-[4px] py-[12px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none";

  // Handle file change, and reset summarization if a new file is uploaded
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      // Reset summarization if a new file is uploaded
      setIsSummarized(false);
      setSummaryResult("");
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
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0">Successfully Created Share Link</h2>
            <img src={checkSign} alt="check" className="size-[96px]  mb-[12px]" />
            
            <div className="flex flex-row items-center">
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
                className="py-2 px-6 bg-white border-l-2 border-r-0 border-t-0 border-b-0 text-black rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out cursor-pointer"
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

      {/* Modal Pop-up for Export */}
      {showExportModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0">Successfully Export Workspace</h2>
            <img src={checkSign} alt="check" className="size-[96px]" />
            <p>____________________________________________</p>
            <button
              onClick={closeModal}
              className="bg-ijo text-white font-bold px-[20px] py-[6px] mb-[8px] ml-auto mr-[10px] shadow border-none rounded hover:bg-ijoHover transition-all duration-300 ease-in-out shadow-[0_2px_3px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="bg-white min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-[60px] rounded-lg shadow-lg w-full max-w-[450px]">
          <h1 className="text-[36px] font-bold text-center mb-auto">Document Summarizer</h1>

          {/* Deskripsi */}
          <p className="text-center text-lg">Summarize your document with the power of AI</p>

          {/* File Input */}
          <div className="flex flex-col items-center">
            <label className="text-black font-[600] mb-[5px]">Click here to Upload Document</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".txt,.doc,.docx,.pdf"
              className="w-full text-darker_grey text-[18px] bg-color_secondary border-2 border-dark_grey rounded-[5px] p-[20px] cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.25)] hover:border-dark_grey hover:ring-2 hover:ring-dark_grey focus:ring-2 focus:ring-dark_grey"
            />
            {file && <div className="text-center text-[18px] text-black">{file.name}</div>}
          </div>

          {/* Keterangan file types */}
          <p className="text-start text-[14px] text-darker_grey">Supported extensions: .txt, .doc, .docx, .pdf</p>

          <div className="flex flex-col items-center">
            {/* Workspace Title */}
            <div className="mb-[16px]">
              <label className="block text-black font-[600] mb-2">Workspace Title</label>
              <input
                type="text"
                placeholder="Enter workspace title"
                value={workspaceTitle}
                onChange={(e) => setWorkspaceTitle(e.target.value)}
                className={inputStyle}
              />
            </div>

            {/* Workspace Description */}
            <div className="mb-6">
              <label className="block text-black font-[600] mb-2">Workspace Description</label>
              <textarea
                placeholder="Enter workspace description"
                value={workspaceDescription}
                onChange={(e) => setWorkspaceDescription(e.target.value)}
                className={inputStyle}
                rows={4}
              />
            </div>            
          </div>
          

          {/* Summarize Button */}
          {!isSummarized && (
            <div className="flex justify-end mb-6">
              <button
                onClick={handleSummarize}
                disabled={!file} // Disable button if no file is uploaded
                className={`py-[8px] px-[24px] mt-[10px] ${!file ? 'bg-color_secondary' : 'bg-biru_muda text-white hover:ring-1 hover:ring-biru_muda cursor-pointer border-biru_muda'} rounded-[5px] shadow-[0_1px_5px_rgba(50,173,230,0.25)] transition-all duration-400 ease-in-out`}
              >
                Summarize
              </button>
            </div>
          )}

          {/* Display message to upload file if none is selected
          {!file && !isSummarized && (
            <p className="text-center text-[red] bg-light_red text-sm mt-2">Please upload a document to summarize.</p>
          )} */}

          <div className="flex justify-center mb-6">
            {/* Summary Result */}
            {isSummarized && (
              <div className="mt-4">
                <label className="block font-[600] mt-[10px]">Summary Result:</label>
                <textarea
                  value={summaryResult}
                  readOnly
                  className={inputStyle}
                  rows={6}
                />
                {/* Share and Export buttons */}
                <div className="mt-4 flex space-x-[12px] justify-end">
                  <button
                    onClick={handleShare}
                    className="py-[8px] px-[24px] mt-[10px] bg-ijo text-white hover:ring-1 hover:ring-ijo cursor-pointer border-ijo rounded-[5px] shadow-[0_1px_5px_rgba(52,199,89,0.25)] transition-all duration-400 ease-in-out"
                  >
                    Share
                  </button>
                  <button
                    onClick={handleExport}
                    className="py-[8px] px-[24px] mt-[10px] bg-minty text-white hover:ring-1 hover:ring-minty cursor-pointer border-minty rounded-[5px] shadow-[0_1px_2px_rgba(0,199,190,0.25)] transition-all duration-400 ease-in-out"
                  >
                    Export
                  </button>
                </div>
              </div>
            )}            
          </div>

          
        </div>
      </div>
    </>
  );
};

export default DocumentSummarizer;
