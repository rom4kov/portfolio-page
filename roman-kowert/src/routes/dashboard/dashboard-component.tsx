import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";

const Dashboard = () => {
  const { setCurrentUser } = useContext(UserContext);
  const handleLogout = async () => {
    const response = await axios.post("http://localhost:5000/api/logout", {
      withCredentials: true,
    });
    console.log(response.data);
    if (response.data.is_authenticated === false) {
      console.log("false");
      setCurrentUser({ email: null, authenticated: false });
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
