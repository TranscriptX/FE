import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaLink, FaDownload, FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import checkSign from "../../assets/check-sign.svg";
import Copy from "../../assets/copy.svg"

const Dashboard = () => {
  const navigate = useNavigate();

  // Data awal
  const initialData = [
    {
      id: 1,
      date: "2025-04-23",
      title: "Nasi Padang",
      description: "Makanan enak khas padang",
      type: "Summarization",
      sharedUrl: "transcriptx.com/shared/link",
    },
    {
      id: 2,
      date: "2025-04-26",
      title: "Bakmi Effata",
      description: "Deskripsi isi bakmie",
      type: "Transcription",
      sharedUrl: "",
    },
  ];

  // Data asli dan yang ditampilkan
  const [originalList, setOriginalList] = useState(initialData);
  const [workspaceList, setWorkspaceList] = useState(initialData);

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewFilter, setViewFilter] = useState("All");

  // Modal states
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<number | null>(null);

  const closeModal = () => {
    setShowShareModal(false);
  };

  const handleShare = () => setShowShareModal(true);

  // Menambahkan navigasi untuk melihat workspace
  const handleViewWorkspace = (id: number) => {
    // Temukan workspace berdasarkan id
    const selectedWorkspace = workspaceList.find((workspace) => workspace.id === id);
    
    // Kirim data workspace ke ViewWorkspace
    navigate(`/view-workspace/${id}`, {
      state: selectedWorkspace, // Mengirim data workspace melalui state
    });
  };

  const handleExport = (id: number) => {
    const selectedWorkspace = workspaceList.find((workspace) => workspace.id === id);
    // Mengarahkan ke halaman ExportWorkspace dan mengirim data workspace
    navigate("/ExportWorkspace", { state: selectedWorkspace });
  };

  const handleEditWorkspace = (id: number) => navigate(`/edit-workspace/${id}`);

  const handleDelete = (id: number) => {
    setWorkspaceToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (workspaceToDelete !== null) {
      const updatedList = workspaceList.filter((w) => w.id !== workspaceToDelete);
      setWorkspaceList(updatedList);
      setOriginalList(updatedList);
      setWorkspaceToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleApplyFilters = () => {
    let filteredList = [...originalList];

    if (startDate && endDate) {
      filteredList = filteredList.filter(workspace => {
        const workspaceDate = new Date(workspace.date);
        return workspaceDate >= new Date(startDate) && workspaceDate <= new Date(endDate);
      });
    }

    if (typeFilter !== "All") {
      filteredList = filteredList.filter(workspace => workspace.type === typeFilter);
    }

    if (viewFilter !== "All") {
      filteredList = filteredList.filter(workspace =>
        viewFilter === "Shared" ? workspace.sharedUrl : !workspace.sharedUrl
      );
    }

    setWorkspaceList(filteredList);
  };

  const resetFilters = () => {
    setWorkspaceList([...originalList]);
    setStartDate("");
    setEndDate("");
    setTypeFilter("All");
    setViewFilter("All");
  };

  const styleTable = "border border-black px-[6px] py-[3px]";

  return (
    <>
      <Navbar currentPage="Dashboard" />

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

      {/* Modal Delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center shadow-[3px_8px_10px_rgba(0,0,0,0.25)]">
            <h2 className="text-xl font-bold mb-0 text-red-600">Are you sure?</h2>
            <img src={checkSign} alt="check" className="size-[96px]" />
            <p className="break-all max-w-[300px] text-center mb-4 mt-2 text-gray-700">
              Do you want to delete this workspace? 
              <br/>
              This action cannot be undone.
            </p>
            <p>____________________________________________</p>
            <div className="flex flex-row justify-end space-x-[8px] mb-[16px]">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-grey text-black font-bold px-[12px] py-[4px] rounded-[4px] border-grey hover:bg-dark_grey cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-[red] text-white font-bold px-[12px] py-[4px] rounded-[4px] border-[red] hover:bg-darker_red cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white min-h-screen flex flex-col justify-start">
        <h1 className="text-[48px] text-center font-bold text-center mb-[60px] mt-[100px]">Dashboard</h1>
        <div className="bg-white w-full max-w-[2000px]">
          {/* Filter Section */}
          <div className="flex flex-col justify-between mb-[50px] gap-[16px]">
            <div className="flex flex-row gap-[16px]">
              <div className="flex flex-col items-start gap-2">
                <label className="font-semibold">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <label className="font-semibold">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>  

            <div className="flex flex-row gap-[16px]">
                <div className="flex flex-col items-start">
                  <label className="font-semibold">Type:</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="All">All</option>
                    <option value="Summarization">Summarization</option>
                    <option value="Transcription">Transcription</option>
                  </select>
                </div>
                <div className="flex flex-col items-start">
                  <label className="font-semibold">View:</label>
                  <select
                    value={viewFilter}
                    onChange={(e) => setViewFilter(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="All">All</option>
                    <option value="Shared">Shared</option>
                    <option value="Not Shared">Not Shared</option>
                  </select>
                </div>  
            </div>
              
            
            <div className="flex items-center gap-[8px]">
              <button
                onClick={handleApplyFilters}
                className="py-[4px] px-[8px] bg-color_secondary rounded-[10px] border-dark_grey text-black rounded hover:bg-dark_grey cursor-pointer hover:text-white"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="py-[4px] px-[8px] bg-light_red rounded-[10px] border-dark_grey text-black rounded hover:bg-dark_red cursor-pointer hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-black table-fixed">
              <thead>
                <tr>
                  <th className={styleTable}>No.</th>
                  <th className={styleTable}>Date</th>
                  <th className={styleTable}>Title</th>
                  <th className={styleTable}>Description</th>
                  <th className={styleTable}>Type</th>
                  <th className={styleTable}>Shared URL</th>
                  <th className={styleTable}>Action</th>
                </tr>
              </thead>
              <tbody>
                {workspaceList.map((workspace, index) => (
                  <tr key={workspace.id}>
                    <td className={styleTable}>{index + 1}</td>
                    <td className={styleTable}>{workspace.date}</td>
                    <td className={styleTable}>{workspace.title}</td>
                    <td className={styleTable}>{workspace.description}</td>
                    <td className={styleTable}>{workspace.type}</td>
                    <td className={styleTable}>{workspace.sharedUrl || "-"}</td>
                    <td className="border border-black px-[6px] py-[5px] flex justify-center space-x-[4px]">
                      <button onClick={() => handleViewWorkspace(workspace.id)} className="text-black bg-ijo border-none rounded-[4px] cursor-pointer py-[4px]"><FaEye /></button>
                      <button onClick={() => handleEditWorkspace(workspace.id)} className="text-black bg-kuning border-none rounded-[4px] cursor-pointer py-[4px]"><FaEdit /></button>
                      <button onClick={handleShare} className="text-black bg-minty border-none rounded-[4px] cursor-pointer py-[4px]"><FaLink /></button>
                      <button onClick={() => handleExport(workspace.id)} className="text-black bg-biru_muda border-none rounded-[4px] cursor-pointer py-[4px]"><FaDownload /></button>
                      <button onClick={() => handleDelete(workspace.id)} className="text-black bg-dark_red border-none rounded-[4px] cursor-pointer py-[4px]"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
