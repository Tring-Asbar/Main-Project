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
    <>
    <div className="admin-dashboard" style={{display:"flex",flexDirection:'column'}}>
      <div className="admin-header">
        <p onClick={()=>setActivePage("teachers")} className={activePage==='teachers'? "active":""}>Teachers</p>
        <p onClick={()=>setActivePage("students")} className={activePage==='students'? "active":""}>Students</p>
        <p onClick={()=>setActivePage("classroom")} className={activePage==='classroom'? "active":""}>Classroom</p>
        <p onClick={()=>setActivePage("announcement")} className={activePage==='announcement'? "active":""}>Announcement</p>
      </div>
      <div className="dashboard-content">
        {navigateContent()}
      </div>
      
    </div>
    </>
  )
}

export default AdminDashboard
