import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar/Sidebar"
import './DashboardLayout.scss'
import Advertisement from "./Advertisement/Advertisement"

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
        <Sidebar/>
        <Outlet/>
        <Advertisement/>
    </div>
  )
}

export default DashboardLayout