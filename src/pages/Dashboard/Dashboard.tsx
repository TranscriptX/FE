import { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaEye, FaEdit, FaLink, FaDownload, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Dashboard = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [workspaceList, setWorkspaceList] = useState([
    { id: 1, date: "26-Apr-2025", title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet", type: "Summarization", sharedUrl: "transcriptx.com/shared/link" },
    { id: 2, date: "26-Apr-2025", title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet", type: "Transcription", sharedUrl: "" },
  ]);

  // Filter states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewFilter, setViewFilter] = useState("All");

  // States for pop-up modals
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (id: number) => {
    setWorkspaceList(workspaceList.filter((workspace) => workspace.id !== id));
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  // Handle navigate to View Workspace
  const handleViewWorkspace = (id: number) => {
    navigate(`/view-workspace/${id}`);
  };

  // Handle navigate to Edit Workspace
  const handleEditWorkspace = (id: number) => {
    navigate(`/edit-workspace/${id}`);
  };

  // Apply filters
  const handleApplyFilters = () => {
    let filteredList = [
      { id: 1, date: "26-Apr-2025", title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet", type: "Summarization", sharedUrl: "transcriptx.com/shared/link" },
      { id: 2, date: "26-Apr-2025", title: "Lorem Ipsum", description: "Lorem ipsum dolor sit amet", type: "Transcription", sharedUrl: "" },
    ];

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
      filteredList = filteredList.filter(workspace => (viewFilter === "Shared" ? workspace.sharedUrl : !workspace.sharedUrl));
    }

    setWorkspaceList(filteredList); // Update workspace list with filtered data
  };

  return (
    <>
      <Navbar currentPage="Dashboard" />

      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[1000px]">
          <h1 className="text-3xl font-bold text-center mb-4">Dashboard</h1>

          {/* Filter section */}
          <div className="flex justify-between mb-4">
            <div className="flex space-x-4">
              <div className="flex space-x-2">
                <label className="font-semibold">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-2">
                <label className="font-semibold">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex space-x-2">
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
              <div className="flex space-x-2">
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
            <button
              onClick={handleApplyFilters}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>

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
                      {/* View and Edit Buttons */}
                      <button onClick={() => handleViewWorkspace(workspace.id)} className="text-blue-500">
                        <FaEye />
                      </button>
                      <button onClick={() => handleEditWorkspace(workspace.id)} className="text-yellow-500">
                        <FaEdit />
                      </button>
                      {/* Delete, Export, and Share Buttons */}
                      <button className="text-green-500">
                        <FaLink />
                      </button>
                      <button className="text-yellow-500">
                        <FaDownload />
                      </button>
                      <button onClick={() => handleDelete(workspace.id)} className="text-red-500">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Pop-up for Share */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold text-center mb-4">Successfully Created Share Link</h2>
            <p className="text-center mb-4">transcriptx/shared/123</p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowShareModal(false)}
                className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pop-up for Export */}
      {showExportModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold text-center mb-4">Successfully Export Workspace</h2>
            <div className="flex justify-center">
              <button
                onClick={() => setShowExportModal(false)}
                className="py-2 px-6 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pop-up for Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-semibold text-center mb-4">Confirmation</h2>
            <p className="text-center mb-4">Are you sure you want to delete the workspace? This action is irreversible.</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="py-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
