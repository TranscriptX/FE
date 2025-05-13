import { useState } from "react";
import Navbar from "../../components/Navbar";  
import checkSign from "../../assets/check-sign.svg";
import { useNavigate } from "react-router-dom";

const ExportWorkspace = () => {
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);  // State untuk modal

  const closeModal = () => {
    setShowExportModal(false);
    navigate("/Dashboard");
  };

  const handleExport = () => {
    setShowExportModal(true);  // Menampilkan modal
  };

const inputStyle = "font-sans w-full px-[4px] py-[6px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none";

  return (
    <>
      <Navbar currentPage="Dashboard" /> 

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
              className="bg-ijo text-color_primary font-bold px-[20px] py-[6px] mb-[8px] ml-auto mr-[10px] shadow border-none rounded hover:bg-ijoHover transition-all duration-300 ease-in-out shadow-[0_2px_3px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="bg-white min-h-screen flex flex-col justify-start items-center">
        <h1 className="text-3xl font-bold text-center mt-[100px]">Export Workspace</h1>
        <div className="bg-white p-[60px] w-full max-w-[1000px]">

          {/* Placeholder title workspace */}
          <h2 className="text-xl font-semibold mb-4">[[WORKSPACE TITLE]]</h2>

          {/* Form untuk menampilkan informasi secara horizontal */}
          <div className="flex space-x-[24px] mb-6">
            {/* Kolom pertama: Author */}
            <div className="w-1/4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Author</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue="[[AUTHOR]]"
                  readOnly
                />
              </div>
            </div>

            {/* Kolom kedua: Created Date */}
            <div className="w-1/4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Created Date</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue="[[CREATED_DATE]]"
                  readOnly
                />
              </div>
            </div>

            {/* Kolom ketiga: Type */}
            <div className="w-1/4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Type</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue="[[TYPE]]"
                  readOnly
                />
              </div>
            </div>

            {/* Kolom keempat: Link */}
            <div className="w-1/4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Link</label>
                <input
                  className={inputStyle}
                  type="text"
                  defaultValue="[[LINK]]"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea
              className={inputStyle}
              rows={4}
              defaultValue="[[DESCRIPTION]]"
              readOnly
            />
          </div>

          {/* Transcription */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Transcription</label>
            <textarea
              className={inputStyle}
              rows={4}
              defaultValue="[[TRANSCRIPTION]]"
              readOnly
            />
          </div>

          {/* Summary */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Summary</label>
            <textarea
              className={inputStyle}
              rows={4}
              defaultValue="[[SUMMARY]]"
              readOnly
            />
          </div>

          {/* Tombol Export */}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleExport}  // Menampilkan modal export saat tombol ini ditekan
              className="bg-biru_muda mt-[16px] text-white font-bold px-[12px] py-[4px] rounded-[4px] border-biru_muda hover:bg-biru hover:border-biru cursor-pointer"
            >
              Export File
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportWorkspace;
