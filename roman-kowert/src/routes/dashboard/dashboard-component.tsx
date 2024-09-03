import axios from "axios";

const Dashboard = () => {
  const handleLogout = async () => {
    const response = await axios.post("http://localhost:5000/api/logout")
    console.log(response.data);
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
