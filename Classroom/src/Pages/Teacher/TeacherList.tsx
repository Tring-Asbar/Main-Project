import { useQuery } from '@apollo/client';
import './TeacherList.scss';
import { teachersList } from '../../graphql/query';
import { useState, useEffect, useCallback } from 'react';
import AddTeacher from './AddTeacher';
import NoDataFound from '../../NoDataFound/NoDataFound';
import User from '../../assets/Images/User.svg';
import { debounce } from 'lodash';
import './AddTeacher.scss';
import Loader from '../../Loader/Loader';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../../Components/customComponents/Button/Button';

const TeacherList = () => {
  const addTeacher = 'add teacher';
  const [searchInput, setSearchInput] = useState('');
  const [activePage, setActivePage] = useState('all teachers');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { data, loading, error, refetch } = useQuery(teachersList, {
    variables: {
      searchInput: '%%', // Initial value to prevent firing on every key stroke
      orderBy: ['T_NAME_ASC'],
      limit,
      offset,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const totalCount = data?.allTeachers?.totalCount || 0;

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setOffset(0);
      refetch({
        searchInput: `%${value}%`,
        orderBy: ['T_NAME_ASC'],
        limit,
        offset: 0,
      });
    }, 500),
    [refetch]
  );

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  const handleViewTeacher = (teacherId: string) => {
    setSelectedTeacherId(teacherId);
    setActivePage(addTeacher);
  };

  const handlePrev = () => {
    if (offset - limit >= 0) {
      const newOffset = offset - limit;
      setOffset(newOffset);
      refetch({ searchInput: `%${searchInput}%`, orderBy: ['T_NAME_ASC'], limit, offset: newOffset });
    }
  };

  const handleNext = () => {
    if (offset + limit < totalCount) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      refetch({ searchInput: `%${searchInput}%`, orderBy: ['T_NAME_ASC'], limit, offset: newOffset });
    }
  };

  const allTeachers = () => {
    const teachers = data?.allTeachers?.nodes ?? [];
    return (
      <>
        <div className="teacher-content">
        
          {loading ? (
            <div><Loader/></div>
          ) : error ? (
            <div className="load-err">Error</div>
          ) : teachers.length > 0 ? (
            teachers.map((teacher: any) => (
              <div className="details" key={teacher.teacherId} onClick={() => handleViewTeacher(teacher.teacherId)}>
                <div className="rounded">
                  <img src={teacher?.avatarUrl || User} alt="Image" />
                </div>
                <div>
                  <h5>{teacher.teacherName}</h5>
                  {teacher?.mainSubject?.nodes?.map((subject: any) => (
                    <div key={subject?.subjectBySjId?.subjectOriginalName}>
                      <p>{subject?.subjectBySjId?.subjectOriginalName ?? "Null"} Teacher</p>
                    </div>
                  ))}
                </div>
                <div>
                  <Button onClick={() => handleViewTeacher(teacher.teacherId)} action='View' />
                </div>
              </div>
            ))
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className="pagination-controls">
          <Button onClick={handlePrev} disabled={offset === 0 || loading} className='arrow' action={<ArrowLeft />} />
          <span>
            {loading
              ? "Loading..."
              : `${offset + 1} - ${Math.min(offset + limit, totalCount)} of ${totalCount}`}
          </span>
          <Button onClick={handleNext} disabled={offset + limit >= totalCount || loading} className='arrow' action={<ArrowRight />} />
        </div>
      </>
    );
  };

  const navigateContent = () => {
    switch (activePage) {
      case 'add teacher':
        return <AddTeacher setActivePage={setActivePage} selectedTeacherId={selectedTeacherId} 
        refetchTeachers={() => refetch({ 
          searchInput: `%${searchInput}%`, 
          orderBy: ['T_NAME_ASC'], 
          limit, 
          offset 
        })}
        />;
      default:
        return allTeachers();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const add = (page: string) => {
    setSelectedTeacherId(null);
    setActivePage(page);
  };

  return (
    <div className="teacher-container">
      
      {activePage !== addTeacher && (
        <div className="teacher-header">
          <div className="all-teacher" onClick={() => setActivePage('all teachers')}>
            <img src={User} alt="Image" />
            <div>
              <p>All Teachers</p>
              <span>{data?.allTeachers?.totalCount > 0 ? `${data.allTeachers.totalCount} Staffs` : 'No Staff'}</span>
            </div>
          </div>
          <div className="search">
            <input type="text" placeholder="Search" value={searchInput} onChange={handleInputChange} />
          </div>
          <div className="add-teacher" onClick={() => add(addTeacher)}>
            <Button action="+" className='add' />
          </div>
        </div>
      )}
      <div>{navigateContent()}</div>
    </div>
  );
};

export default TeacherList;
