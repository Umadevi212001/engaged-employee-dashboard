const EmployeeList = ({ employees, setEditEmp, saveEmployees }) => {

  const deleteEmp = (id) => {
    if (window.confirm("Delete employee?")) {
      saveEmployees(employees.filter(e => e.id !== id));
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.gender}</td>
            <td>
              <button onClick={() => setEditEmp(emp)}>Edit</button>
              <button onClick={() => deleteEmp(emp.id)}>Delete</button>
              <button onClick={() => window.print()}>Print</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
