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
  const setActiveTab=(value:string,index:number)=>{
    localStorage.removeItem('index');
    setActivePage(value);
    localStorage.setItem('index',index+"");

  }

  
  return (
    <>
    <div className="admin-dashboard" style={{display:"flex",flexDirection:'column'}}>
      <div className="admin-header">
        <p onClick={()=>setActiveTab("teachers",0)} className={activePage==='teachers'? "active":""}>Teachers</p>
        <p onClick={()=>setActiveTab("students",1)} className={activePage==='students'? "active":""}>Students</p>
        <p onClick={()=>setActiveTab("classroom",2)} className={activePage==='classroom'? "active":""}>Classroom</p>
        <p onClick={()=>setActiveTab("announcement",3)} className={activePage==='announcement'? "active":""}>Announcement</p>
      </div>
      <div className="dashboard-content">
        {navigateContent()}
      </div>
      
    </div>
    </>
  )
}

export default AdminDashboard
