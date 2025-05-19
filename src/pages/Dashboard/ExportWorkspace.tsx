import { useState } from "react";
import Navbar from "../../components/Navbar";
import checkSign from "../../assets/check-sign.svg";
import { useNavigate, useLocation } from "react-router-dom";
import API_PATH from "../../api/API_PATH";

const ExportWorkspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const workspace = location.state || {};

  const [showExportModal, setShowExportModal] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);

  const token = localStorage.getItem("token");

  const handleExport = async () => {
    if (!token || !workspace.workspaceID) {
      alert("Missing token or workspace data");
      return;
    }
    setLoadingExport(true);
    try {
      const res = await fetch(`${API_PATH}/api/workspaces/export`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ workspaceID: workspace.workspaceID }),
      });

      if (!res.ok) throw new Error(`Export failed with status ${res.status}`);

      // Respone adalah file PDF binary
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Download file PDF dengan nama workspace_title.pdf
      const a = document.createElement("a");
      a.href = url;
      a.download = `${workspace.title || "workspace"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setShowExportModal(true);
    } catch (error) {
      alert("Failed to export workspace: " + (error as Error).message);
    } finally {
      setLoadingExport(false);
    }
  };

  const closeModal = () => {
    setShowExportModal(false);
    navigate("/Dashboard");
  };

  const inputStyle =
    "font-sans w-full px-[4px] py-[6px] mt-[8px] inset-shadow-[0px_0px_2px_1px_rgba(0,0,0,0.25)] border border-dark_grey rounded-[5px] focus:outline-none focus:ring-2 focus:ring-dark_grey text-[16px] focus:shadow-[0_2px_1px_rgba(0,0,0,0.25)] focus:inset-shadow-none";

  return (
    <>
      <Navbar currentPage="Dashboard" />

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
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
          <h2 className="text-xl font-semibold mb-4">{workspace.title || "Untitled"}</h2>

          <div className="flex space-x-[24px] mb-6">
            <div className="w-1/4">
              <label className="block text-gray-700 font-semibold">Author</label>
              <input className={inputStyle} type="text" value={workspace.author || ""} readOnly />
            </div>
            <div className="w-1/4">
              <label className="block text-gray-700 font-semibold">Created Date</label>
              <input className={inputStyle} type="text" value={workspace.createdDate || ""} readOnly />
            </div>
            <div className="w-1/4">
              <label className="block text-gray-700 font-semibold">Type</label>
              <input className={inputStyle} type="text" value={workspace.type || ""} readOnly />
            </div>
            <div className="w-1/4">
              <label className="block text-gray-700 font-semibold">Link</label>
              <input className={inputStyle} type="text" value={workspace.link || ""} readOnly />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Description</label>
            <textarea className={inputStyle} rows={4} value={workspace.description || ""} readOnly />
          </div>

          <button
            onClick={handleExport}
            disabled={loadingExport}
            className="bg-biru_muda mt-[16px] text-white font-bold px-[12px] py-[4px] rounded-[4px] border-biru_muda hover:bg-biru hover:border-biru cursor-pointer disabled:opacity-50"
          >
            {loadingExport ? "Exporting..." : "Export File"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ExportWorkspace;
