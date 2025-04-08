
import { useQuery } from '@apollo/client';
import './TeacherList.scss';
import { teachersList } from '../../graphql/TeachersListApi';
import { useState, useEffect, useCallback } from 'react';
import AddTeacher from './AddTeacher';
import NoDataFound from '../../NoDataFound/NoDataFound';
import User from '../../assets/Images/User.svg';
import { debounce } from 'lodash';
import './AddTeacher.scss';
import Loader from '../../Loader/Loader';

const TeacherList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState('all teachers');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  
  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  const { data, loading, error,refetch } = useQuery(teachersList, { 
    variables: {
      searchInput: `%${searchQuery}%`,
      orderBy: ['T_NAME_ASC'],
      limit: 9,
      offset: 0,
    },
    fetchPolicy:'network-only',

  });

  const handleViewTeacher = async (teacherId: string) => {
    setSelectedTeacherId(teacherId);
    setActivePage('add teacher');
  
  };
  
  

  const allTeachers = () => {
    if (loading) 
      return <div><Loader /></div>;
    if (error) 
      return <p className="load-err">Error</p>;
    return (
      <div className="teacher-content">
        
        {data?.allTeachers?.nodes?.length > 0 ? (
          data?.allTeachers?.nodes?.map((teacher: any) => (
            <div className="details" key={teacher.teacherId} onClick={() => handleViewTeacher(teacher.teacherId)}>
              <div className="rounded">
                <img src={teacher?.avatarUrl?(teacher.avatarUrl):(User)} alt="Image" />
              </div>
              <div>
                <h5>{teacher.teacherName}</h5>
                {teacher?.mainSubject?.nodes?.map((subject: any) => (
                  <div key={subject?.subjectBySjId?.subjectOriginalName}>
                    <p>{subject?.subjectBySjId?.subjectOriginalName} Teacher</p>
                  </div>
                ))}
              </div>
              <div>
                <button onClick={() => handleViewTeacher(teacher.teacherId)}>View</button>
              </div>
            </div>
          ))
        ) : (
          <NoDataFound />
        )}
      </div>
    );
  };

  const navigateContent = () => {
    switch (activePage) {
      case 'add teacher':
        return <AddTeacher setActivePage={setActivePage} selectedTeacherId={selectedTeacherId} />;
      default:
        return allTeachers();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="teacher-container">
      {activePage !== "add teacher" && (
        <div className="teacher-header">
          <div className="all-teacher" onClick={() => setActivePage('all teachers')}>
            <img src={User} alt='Image' />
            <div>
              <p>All Teachers</p>
              <span>{data?.allTeachers?.totalCount > 0 ? `${data.allTeachers.totalCount} Staffs` : 'No Staff'}</span>
            </div>
          </div>
          <div className="search">
            <input type="text" placeholder="Search" value={searchInput} onChange={handleInputChange} />
          </div>
          <div className="add-teacher" onClick={() =>{setSelectedTeacherId(null);setActivePage('add teacher');}}>
            <p>+</p>
          </div>
        </div>
      )}
      {navigateContent()}
    </div>
  );
};

export default TeacherList;
