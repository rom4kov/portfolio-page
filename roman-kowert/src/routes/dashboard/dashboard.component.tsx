import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";

import DashboardNav from "../../components/dashboard-nav/dashboard-nav.component";

const Dashboard = () => {
  const { setCurrentUser } = useContext(UserContext);

  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/logout",
      {},
      {
        withCredentials: true,
      },
    );
    if (response.data.is_authenticated === false) {
      setCurrentUser({ email: null, authenticated: false });
      localStorage.clear();
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between w-full mb-12">
        <h1>Dashboard</h1>
        <button className="h-12" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="flex justify-between">
        <DashboardNav />
        <div className="w-[40vw] h-[70vh] border rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
