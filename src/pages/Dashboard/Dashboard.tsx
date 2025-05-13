import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaLink, FaDownload, FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import checkSign from "../../assets/check-sign.svg";

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

  return (
    <>
      <Navbar currentPage="Dashboard" />

      {/* Modal Pop-up for Share */}
      {showShareModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 flex justify-center items-center opacity-70 z-49 bg-color_primary min-w-screen min-h-screen"></div>
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

      {/* Modal Delete */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center min-w-screen min-h-screen z-48">
          <div className="fixed inset-0 opacity-70 z-49 bg-color_primary"></div>
          <div className="bg-pop p-8 rounded-lg shadow-lg min-w-[400px] text-center z-51 relative flex flex-col items-center">
            <h2 className="text-xl font-bold mb-0 text-red-600">Are you sure?</h2>
            <img src={checkSign} alt="check" className="size-[96px]" />
            <p className="break-all max-w-[300px] text-center mb-4 mt-2 text-gray-700">
              Do you want to delete this workspace? 
              <br/>
              This action cannot be undone.
            </p>
            <p>____________________________________________</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-black font-bold px-5 py-2 rounded hover:bg-gray-400 shadow"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white font-bold px-5 py-2 rounded hover:bg-red-700 shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[1000px]">
          <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

          {/* Filter Section */}
          <div className="flex flex-wrap justify-between mb-6 gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="font-semibold">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-semibold">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center gap-2">
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
              <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
              <button
                onClick={handleApplyFilters}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply Filters
              </button>
              <button
                onClick={resetFilters}
                className="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500 table-fixed">
              <thead>
                <tr>
                  <th className="px-6 py-3">No.</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Shared URL</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {workspaceList.map((workspace, index) => (
                  <tr key={workspace.id}>
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{workspace.date}</td>
                    <td className="px-6 py-3">{workspace.title}</td>
                    <td className="px-6 py-3">{workspace.description}</td>
                    <td className="px-6 py-3">{workspace.type}</td>
                    <td className="px-6 py-3">{workspace.sharedUrl || "-"}</td>
                    <td className="px-6 py-3 flex justify-end space-x-2">
                      <button onClick={() => handleViewWorkspace(workspace.id)} className="text-ijo"><FaEye /></button>
                      <button onClick={() => handleEditWorkspace(workspace.id)} className="text-kuning"><FaEdit /></button>
                      <button onClick={handleShare} className="text-grey"><FaLink /></button>
                      <button onClick={() => handleExport(workspace.id)} className="text-biru"><FaDownload /></button>
                      <button onClick={() => handleDelete(workspace.id)} className="text-light_red"><FaTrash /></button>
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
