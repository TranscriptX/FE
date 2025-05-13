import { useState } from "react";
import Navbar from "../../components/Navbar"; // Import Navbar
import checkSign from "../../assets/check-sign.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Copy from "../../assets/copy.svg"


const AudioVideoTranscription = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [file, setFile] = useState<File | null>(null);
  const [workspaceTitle, setWorkspaceTitle] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [transcriptionResult, setTranscriptionResult] = useState("");
  const [summarizedText, setSummarizedText] = useState(""); // For storing the summarized text
  const [isTranscribed, setIsTranscribed] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false); // To track if summarize was clicked

  const inputStyle = "font-sans w-[480px] px-[4px] py-[12px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none";

  // States for pop-up modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);

      // Reset summarization and transcription if new file is uploaded
      setIsTranscribed(false);
      setIsSummarized(false);
      setTranscriptionResult("");
      setSummarizedText("");
    }
  };

  const handleTranscribe = () => {
    setTranscriptionResult("Transcription of the audio/video will be here..."); // Placeholder transcription
    setIsTranscribed(true); // Mark the transcription as done
  };

  const handleSummarize = () => {
    setSummarizedText("This is the summarized text based on the transcription."); // Placeholder summarize
    setIsSummarized(true);
  };

  const handleShare = () => {
    setShowShareModal(true); // Show the share confirmation modal
  };

  // Change: Export now navigates to the ExportWorkspace page
  const handleExport = () => {
    const workspaceData = {
      title: workspaceTitle,
      description: workspaceDescription,
      transcription: transcriptionResult,
      summarizedText: summarizedText,
      fileName: file ? file.name : "Unnamed File",
    };
    // Redirect to the export page with the workspace data
    navigate("/ExportWorkspace", { state: workspaceData });
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
            <img src={checkSign} alt="check" className="size-[96px] mb-[12px]" />
            
            <div className="flex flex-row items-center">
              {/* Textbox for the link */}
              <textarea
                value="transcriptx/shared/123"  // Link yang akan ditampilkan
                readOnly  // Agar tidak bisa diubah oleh pengguna
                className="w-[200px] border-grey rounded-md text-center"
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
          <h1 className="text-[36px] font-bold text-center mb-auto">Audio/Video Transcription</h1>

          {/* Deskripsi */}
          <p className="text-center text-lg">Transcribe your audio/video with the power of AI</p>

          {/* File Input */}
          <div className="flex flex-col items-center">
            <label className="text-black font-[600] mb-[5px]">Click here to Upload Audio/Video</label>
            <input
              placeholder='Upload Document'
              type="file"
              onChange={handleFileChange}
              accept="audio/*,video/*"
              className="w-full text-darker_grey text-[18px] bg-color_secondary border-2 border-dark_grey rounded-[5px] p-[20px] cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.25)] hover:border-dark_grey hover:ring-2 hover:ring-dark_grey focus:ring-2 focus:ring-dark_grey"
            />
            {file && <div className="text-center text-[18px] text-black">{file.name}</div>}
          </div>

          {/* Keterangan file types */}
          <p className="text-start text-[14px] text-darker_grey">Supported extensions: .mp3, .wav, .mp4, .mov, .avi</p>
          
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
          

          {/* Transcribe Button */}
          <div className="flex justify-end mb-6">
            {!isTranscribed && (
              <button
                onClick={handleTranscribe}
                disabled={!file} // Disable if no file is uploaded
                className={`py-[8px] px-[24px] mt-[10px] ${!file ? 'bg-color_secondary' : 'bg-pinky text-white hover:ring-1 hover:ring-light_pinky cursor-pointer border-light_pinky'} rounded-[5px] shadow-[0_1px_2px_rgba(240,114,174,0.25)] transition-all duration-400 ease-in-out`}
              >
                Transcribe
              </button>
            )}
          </div>

          {/* Pemberitahuan untuk upload file
          {!file && !isTranscribed && (
            <p className="text-center text-[red] bg-light_red text-sm mt-2">Please upload an audio/video file to transcribe.</p>
          )} */}

          <div className="flex flex-col items-center">
          {/* Transcription Result */}
            {isTranscribed && (
              <div>
                <label className="block font-[600] mt-[10px]">Transcription Result:</label>
                <textarea
                  value={transcriptionResult}
                  readOnly
                  className={inputStyle}
                  rows={6}
                />

                {/* Summarize Button */}
                {!isSummarized && (
                  <div className="flex justify-end mb-[12px]">
                    <button
                      onClick={handleSummarize}
                      className="py-[8px] px-[24px] mt-[20px] bg-biru_muda text-white hover:ring-1 hover:ring-biru_muda cursor-pointer border-biru_muda rounded-[5px] shadow-[0_1px_5px_rgba(50,173,230,0.25)] transition-all duration-400 ease-in-out"
                    >
                      Summarize
                    </button>
                  </div>
                )}

                {/* Summarized Result */}
                {isSummarized && (
                  <div className="mt-6">
                    <label className="block font-[600] mt-[10px]">Summarized Result:</label>
                    <textarea
                      value={summarizedText}
                      readOnly
                      className={inputStyle}
                      rows={6}
                    />
                  </div>
                )}

                {/* Share and Export buttons */}
                <div className="mt-4 flex space-x-[12px] justify-end">
                  <button
                    onClick={handleShare}
                    className="py-[8px] px-[24px] mt-[10px] bg-ijo text-white hover:ring-1 hover:ring-ijo cursor-pointer border-ijo rounded-[5px] shadow-[0_1px_5px_rgba(52,199,89,0.25)] transition-all duration-400 ease-in-out"
                  >
                    Share
                  </button>
                  
                  <button onClick={handleExport}
                    className="py-[8px] px-[24px] mt-[10px] bg-minty text-white hover:ring-1 hover:ring-minty cursor-pointer border-minty rounded-[5px] shadow-[0_1px_2px_rgba(0,199,190,0.25)] transition-all duration-400 ease-in-out">
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

export default AudioVideoTranscription;
