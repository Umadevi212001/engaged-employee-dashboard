import { useEffect, useState } from "react";

const EmployeeForm = ({ employees, saveEmployees, editEmp, setEditEmp }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true
  });

  useEffect(() => {
    if (editEmp) setForm(editEmp);
  }, [editEmp]);

  const submit = (e) => {
    e.preventDefault();

    let updated;
    if (editEmp) {
      updated = employees.map(emp =>
        emp.id === editEmp.id ? { ...form, id: emp.id } : emp
      );
    } else {
      updated = [...employees, { ...form, id: Date.now() }];
    }

    saveEmployees(updated);
    setForm({ name: "", gender: "", dob: "", state: "", active: true });
    setEditEmp(null);
  };

  return (
    <form onSubmit={submit}>
      <input required placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <select required value={form.gender}
        onChange={e => setForm({ ...form, gender: e.target.value })}>
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <button type="submit">
        {editEmp ? "Update" : "Add"} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
