import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";

import DashboardNav from "../../components/dashboard-nav/dashboard-nav.component";

const Dashboard = () => {
  const { setCurrentUser } = useContext(UserContext);

  const handleLogout: () => Promise<void> = async () => {
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
    <div className="w-full flex">
      <div className="w-[50%] h-[80vh] flex flex-col justify-between mb-12">
        <h1 className="text-start mb-5">Dashboard</h1>
        <DashboardNav handleLogout={handleLogout} />
      </div>
      <div className="w-[50%] h-[80vh] border rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
