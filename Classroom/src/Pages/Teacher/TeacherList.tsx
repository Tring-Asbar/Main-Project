import { useQuery } from '@apollo/client';
import './TeacherList.scss';
import { teachersList } from '../../graphql/query';
import { useState, useEffect, useCallback, useRef } from 'react';
import AddTeacher from './AddTeacher';
import NoDataFound from '../../NoDataFound/NoDataFound';
import User from '../../assets/Images/User.svg';
import { debounce } from 'lodash';
import './AddTeacher.scss';
import Loader from '../../Loader/Loader';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CircularProgress } from '@mui/material';

const TeacherList = () => {
  const addTeacher = 'add teacher';
  const [searchInput, setSearchInput] = useState('');
  const [activePage, setActivePage] = useState('all teachers');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, loading, error, refetch } = useQuery(teachersList, {
    variables: {
      searchInput: `%${searchInput}%`,
      orderBy: ['T_NAME_ASC'],
      limit,
      offset,
    },
    fetchPolicy: 'network-only',
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

  // Scroll handler
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      if (atBottom && offset + limit < totalCount) {
        setOffset((prev) => {
          const newOffset = prev + limit;
          refetch({ searchInput: `%${searchInput}%`, orderBy: ['T_NAME_ASC'], limit, offset: newOffset });
          return newOffset;
        });
      }

      if (atTop && offset - limit >= 0) {
        setOffset((prev) => {
          const newOffset = prev - limit;
          refetch({ searchInput: `%${searchInput}%`, orderBy: ['T_NAME_ASC'], limit, offset: newOffset });
          return newOffset;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [offset, refetch, totalCount, searchInput]);

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
        <div className="teacher-content" ref={scrollRef}>
          {loading ? (
            <div><Loader /></div>
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
  
        {/* Pagination Arrows Always Visible */}
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={offset === 0 || loading}>
            <ArrowLeft />
          </button>
          <span>
            {loading
              ? "Loading "
              : `${offset + 1} - ${Math.min(offset + limit, totalCount)} of ${totalCount}`}
          </span>
          <button onClick={handleNext} disabled={offset + limit >= totalCount || loading}>
            <ArrowRight />
          </button>
        </div>
      </>
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
            <p>+</p>
          </div>
        </div>
      )}
      {navigateContent()}
    </div>
  );
};

export default TeacherList;
