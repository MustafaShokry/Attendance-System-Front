import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for routing
import { useParams } from 'react-router-dom'; // Import useParams

import Navbar from '../../components/Navbar';
import LoadingScreen from '../../components/LoadingScreen';
import InstructorCourseDetails from '../../components/courses/InstructorCourseDetails';
import AttendanceTable from '../../components/courses/AttendanceTable';

import { fetchAttendanceData, updateAttendanceData } from '../../api/instructor/attendanceData.js';
import { fetchData } from '../../api/instructor/data.js';
import { fetchCourses } from '../../api/instructor/courses.js';
import {downloadAttendanceData} from '../../api/instructor/downloadAttendance.js';




function StudentDashboard({ logout, isAuthenticated }) {
  const { instructorId } = useParams(); // Get studentId from the URL params
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [showAttendanceData, setshowAttendanceData] = useState(false);
  const [detailsCourseId, setdetailsCourseId] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const navigationItems = [
    { root: '/', label: 'Home' },
    { root: `/instructor-dashboard/${instructorId}`, label: 'Dashboard' },
    { root: `/instructor-Warnings/${instructorId}`, label: 'Warnings' },
    { root: '/contact', label: 'Contact' },
    // Add more navigation items as needed
  ]; 

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const data = await fetchCourses(instructorId);
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchInstructorData = async () => {
      try {
        const data = await fetchData(instructorId);
        setInstructorData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructorData();
    fetchInstructorCourses();
  }, []);


  const handleViewDetailsClick = async (courseId) => {
    try {
      const data = await fetchAttendanceData(courseId);
      setAttendanceData(data);
      setdetailsCourseId(courseId);
    } catch (error) {
      console.error(error);
    }
    setshowAttendanceData(true);
  };

  const handleDownloadClick = async (courseId) => {
    await downloadAttendanceData(courseId);
  }

  const handleCloseDetailsClick = () => {
    setshowAttendanceData(false);
  }

  const handleSaveChangesClick = async (courseId, attendanceData) => {
    console.log(attendanceData);
    console.log(courseId);
    await updateAttendanceData(courseId, attendanceData);
  }

  const handleLogout = () => {
    logout();
  };

  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  // Display loading indicator while waiting for data
  if (instructorData === null || courses.length === 0) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-gray-200 h-[100%]">
      <Navbar navItems={navigationItems}/>
      <div className="max-w-5xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-semibold mb-4">Instructor dashboard</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700"><strong>Name:</strong></p>
              <p className="text-gray-900">{instructorData.instructorName}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Email:</strong></p>
              <p className="text-gray-900">{instructorData.instructorEmail}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Position:</strong></p>
              <p className="text-gray-900">{instructorData.instructorPosition}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Total courses taught:</strong></p>
              <p className="text-gray-900">{instructorData.numberOfCoursesTaught}</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>Total suspended students:</strong></p>
              <span className={`ml-2 ${instructorData.numberOfSuspendedStudents == 0 ? 'text-green-500' : 'text-red-500'}`}>{instructorData.numberOfSuspendedStudents}</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Taught Courses</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto py-3 px-4">
            {courses.map((course) => (
              <div key={course.co_id}>
                <InstructorCourseDetails
                  course={course}
                  onDetailsClick={handleViewDetailsClick}
                  onDownloadClick={handleDownloadClick}

                />
              </div>
            ))}
          </div>

          {showAttendanceData && (
            <AttendanceTable
              attendanceData={attendanceData}
              courseName={'Course Name'}
              onCloseButtonClick={handleCloseDetailsClick}
              onSaveChangesClick={handleSaveChangesClick}
              courseId={detailsCourseId}

            />
          )}

          <button
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
