import { useState } from "react";
import Navbar from "../../components/Navbar";  
import checkSign from "../../assets/check-sign.svg";

const ExportWorkspace = () => {
  const [showExportModal, setShowExportModal] = useState(false);  // State untuk modal

  const closeModal = () => {
    setShowExportModal(false);
  };

  const handleExport = () => {
    setShowExportModal(true);  // Menampilkan modal
  };

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
              className="bg-yellow-500 text-white font-bold px-[20px] py-[6px] mb-[8px] ml-auto mr-[10px] shadow border-none rounded hover:bg-yellow-600 transition-all duration-300 ease-in-out shadow-[0_2px_3px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[1000px]">
          <h1 className="text-3xl font-bold text-center mb-6">Export Workspace</h1>

          {/* Placeholder title workspace */}
          <h2 className="text-xl font-semibold mb-4">[[WORKSPACE TITLE]]</h2>

          {/* Form untuk menampilkan informasi secara horizontal */}
          <div className="flex space-x-6 mb-6">
            {/* Kolom pertama: Author */}
            <div className="w-1/4">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Author</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              defaultValue="[[DESCRIPTION]]"
              readOnly
            />
          </div>

          {/* Transcription */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Transcription</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              defaultValue="[[TRANSCRIPTION]]"
              readOnly
            />
          </div>

          {/* Summary */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Summary</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={4}
              defaultValue="[[SUMMARY]]"
              readOnly
            />
          </div>

          {/* Tombol Export */}
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleExport}  // Menampilkan modal export saat tombol ini ditekan
              className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
