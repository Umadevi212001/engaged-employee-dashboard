import React, { useRef, useState, useEffect } from "react";
import "../styles/EmployeeModal.css";

const defaultForm = {
  id: "",
  name: "",
  gender: "Male",
  dob: "",
  state: "",
  status: "Active",
  image: ""
};

const EmployeeModal = ({ open, onClose, onSave, editData }) => {
  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState("");
  const fileInput = useRef();

  useEffect(() => {
    if (editData) {
      setForm(editData);
      setPreview(editData.image || "");
    } else {
      setForm(defaultForm);
      setPreview("");
    }
  }, [editData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreview(ev.target.result);
        setForm((prev) => ({ ...prev, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.dob || !form.state) return;
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{editData ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit} className="employee-form-modal">
          <div className="img-upload">
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleImage}
            />
            <div
              className="img-preview"
              onClick={() => fileInput.current.click()}
              title="Upload profile image"
            >
              {preview ? (
                <img src={preview} alt="Preview" />
              ) : (
                <span>Click to upload</span>
              )}
            </div>
          </div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            required
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button type="submit" className="save-btn">
            {editData ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
