import { useQuery } from '@apollo/client'
import './TeacherList.scss'
import { teachersList } from '../../graphql/TeachersListApi'
import { useState } from 'react'
import AddTeacher from './AddTeacher'
import NoDataFound from '../../NoDataFound/NoDataFound'
import User from '../../assets/Images/User.svg'


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
        {data?.allTeachers?.nodes?.length>0?(
        data?.allTeachers?.nodes?.map((teacher:any)=>(
          <div className="details" key={teacher.teacherId}>
            <div className='rounded'>
              <img src={User} alt="" />
            </div>
            <div>
              <h5>{teacher.teacherName}</h5>
            </div>
            
              {teacher?.mainSubject?.nodes?.map((subject:any)=>(
                <div>
                  <p>{subject?.subjectBySjId?.subjectOriginalName} Teacher</p> 
                </div>
                
              ))}
              <div>
                <button>View</button>
              </div>
            
            
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
        <div className="all-teacher" onClick={()=>setActivePage("all teachers")}>
          <p>All Teachers</p>
          <span>{data.allTeachers.totalCount>0 ?(data.allTeachers.totalCount+" Staffs"):("No Staff")}</span>
          </div>
        <div className="search">
          <input type="text" placeholder='Search'/>
        </div>
        <div className="add-teacher" onClick={()=>setActivePage("add teacher")}>
          <p>+</p>
        </div>
      </div>
      {navigateContent()}
      
    </div>
  )
}

export default TeacherList