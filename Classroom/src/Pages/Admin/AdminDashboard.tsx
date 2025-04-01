import { useState } from 'react'
import './Styles/AdminDashboard.scss'
import TeacherList from '../Teacher/TeacherList';
import Student from '../Student/Student';
import Classroom from '../Classroom/Classroom';
import Announcement from '../Announcement/Announcement';


const AdminDashboard = () => {
  const [activePage,setActivePage] = useState("teachers");

  const navigateContent = () =>{
    switch(activePage){
      case "teachers":
        return <TeacherList/>
      case "students":
        return <Student/>
      case "classroom":
        return <Classroom/>
      case "announcement":
        return <Announcement/>
      default:
        return <TeacherList/>
    }
  }

  
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <p onClick={()=>setActivePage("teachers")}>Teachers</p>
        <p onClick={()=>(setActivePage("students"))}>Students</p>
        <p onClick={()=>setActivePage("classroom")}>Classroom</p>
        <p onClick={()=>setActivePage("announcement")}>Announcement</p>
      </div>
      <div className="dashboard-content">
        {navigateContent()}
      </div>
    </div>
  )
}

export default AdminDashboard