import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import EmployeeTable from "./EmployeeTable";
import EmployeeModal from "./EmployeeModal";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(data);
  }, []);

  const saveEmployees = (data) => {
    setEmployees(data);
    localStorage.setItem("employees", JSON.stringify(data));
  };

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (emp) => {
    setEditData(emp);
    setModalOpen(true);
  };

  const handleSave = (emp) => {
    let updated;
    if (emp.id) {
      updated = employees.map(e => e.id === emp.id ? emp : e);
    } else {
      emp.id = Date.now();
      updated = [...employees, emp];
    }
    saveEmployees(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete employee?")) {
      saveEmployees(employees.filter(e => e.id !== id));
    }
  };

  // Filtering
  const filtered = employees.filter(e => {
    return (
      (!search || e.name.toLowerCase().includes(search.toLowerCase())) &&
      (!gender || gender === "All Genders" || e.gender === gender) &&
      (!status || status === "All Status" || e.status === status)
    );
  });

  const activeCount = employees.filter(e => e.status === "Active").length;
  const inactiveCount = employees.filter(e => e.status === "Inactive").length;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Employee Dashboard</h1>
        <button className="logout-btn" onClick={() => { localStorage.removeItem("login"); window.location.href = "/"; }}>Logout</button>
      </header>

      {/* Summary Cards */}
      <section className="summary-section">
        <div className="summary-card">
          <p>Total Employees</p>
          <h2>{employees.length}</h2>
        </div>
        <div className="summary-card active">
          <p>Active</p>
          <h2>{activeCount}</h2>
        </div>
        <div className="summary-card inactive">
          <p>Inactive</p>
          <h2>{inactiveCount}</h2>
        </div>
      </section>

      {/* Controls */}
      <section className="controls">
        <input type="text" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
        <select value={gender} onChange={e => setGender(e.target.value)}>
          <option>All Genders</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button className="add-btn" onClick={handleAdd}>+ Add Employee</button>
      </section>

      {/* Table */}
      <EmployeeTable
        employees={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EmployeeModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
};

export default Dashboard;
