const EmployeeSummary = ({ employees }) => {
  const active = employees.filter(e => e.active).length;

  return (
    <div>
      <h3>Total Employees: {employees.length}</h3>
      <p>Active: {active} | Inactive: {employees.length - active}</p>
    </div>
  );
};

export default EmployeeSummary;
