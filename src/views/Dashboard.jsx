import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = () => {
    axiosClient
      .get("/dashboard")
      .then(({ data }) => {
        setDashboardData(data.data);
      })
      .catch(() => {});
  };

  return (
    <>
      <div className="card-parent">
        <div className="card-child">
          <div className="card-number">{dashboardData.userCount}</div>
          <div className="card-text">Users</div>
        </div>
        <div className="card-child">
          <div className="card-number">{dashboardData.artistCount}</div>
          <div className="card-text">Artists</div>
        </div>
        <div className="card-child">
          <div className="card-number">{dashboardData.musicCount}</div>
          <div className="card-text">Music</div>
        </div>
      </div>
    </>
  );
}
