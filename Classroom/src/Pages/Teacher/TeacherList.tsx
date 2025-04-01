import { useQuery } from '@apollo/client'
import './TeacherList.scss'
import { teachersList } from '../../graphql/TeachersListApi'
import { useState } from 'react'
import AddTeacher from './AddTeacher'
import NoDataFound from '../../NoDataFound/NoDataFound'


const TeacherList = () => {

  const { data,loading,error } = useQuery(teachersList,{
    variables:{
      searchInput:"%%",
      orderBy:["T_NAME_ASC"],
    }
  });
  

  const [activePage,setActivePage] = useState("all teachers")


  const allTeachers = () =>{
    return(
    <div className='teacher-content'>
        {data?.allTeachers?.length>0?(
        data?.allTeachers?.map((teacher:any)=>(
          <div className="details">
            {teacher.teacherId}
          </div>
        )))
        :(
          <NoDataFound/>
        )}
    </div>
    )
  }

  const navigateContent = () =>{
    switch(activePage){
      case "all teachers":
        return allTeachers();
      case "add teacher":
        return <AddTeacher/>;
      default:
        return allTeachers();
    }
  }

  if(loading)return <p>Loading</p>
  if(error) return <p>Error</p>
  
  return (
    <div className='teacher-container'>
      <div className="teacher-header">
        <div className="all-teacher" onClick={()=>setActivePage("all teachers")}>All Teachers</div>
        <div className="search">
          <input type="text" placeholder='Search'/>
        </div>
        <div className="add-teacher" onClick={()=>setActivePage("add teacher")}>
          <p>Add Teacher</p>
        </div>
      </div>
      {navigateContent()}
      
    </div>
  )
}

export default TeacherList