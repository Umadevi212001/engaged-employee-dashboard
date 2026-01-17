const SearchFilter = ({ employees, setEmployees }) => {

  const search = (value) => {
    const data = JSON.parse(localStorage.getItem("employees")) || [];
    const filtered = data.filter(e =>
      e.name.toLowerCase().includes(value.toLowerCase())
    );
    setEmployees(filtered);
  };

  return (
    <input placeholder="Search employee"
      onChange={e => search(e.target.value)} />
  );
};

export default SearchFilter;
