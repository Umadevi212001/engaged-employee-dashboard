import React from "react";
import "../styles/Dashboard.css";

const defaultAvatar =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <circle cx='12' cy='8' r='4' fill='#CBD5E1'/>
      <path d='M4 20c0-4 4-6 8-6s8 2 8 6' fill='#CBD5E1'/>
    </svg>
  `);

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (!employees) {
    return <div className="table-wrapper">Loading...</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", color: "#888" }}>
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.id}</td>

                {/* Profile Image */}
                <td>
                  <img
                    src={emp.image || defaultAvatar}
                    alt="profile"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                      background: "#e2e8f0",
                    }}
                  />
                </td>

                <td>{emp.name}</td>
                <td>{emp.gender}</td>
                <td>{emp.dob}</td>
                <td>{emp.state}</td>
                <td>
                  <span
                    className={`status ${
                      emp.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="actions">
                  <button onClick={() => onEdit(emp)}>Edit</button>
                  <button
                    className="delete"
                    onClick={() => onDelete(emp.id)}
                  >
                    Delete
                  </button>
                  <button onClick={() => window.print()}>Print</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
