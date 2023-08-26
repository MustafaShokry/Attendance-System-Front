import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for routing
import { useParams } from 'react-router-dom'; // Import useParams
import CourseDetails from '../../components/courses/CourseDetails';
import { fetchData } from '../../api/student/data.js';
import { fetchCourses } from '../../api/student/courses.js';
import Navbar from '../../components/Navbar';
import LoadingScreen from '../../components/LoadingScreen';
import LectureDetails from '../../components/courses/LectureDetails';
const navigationItems = [
    { root: '/', label: 'Home' },
    { root: '/about', label: 'About' },
    { root: '/services', label: 'Services' },
    { root: '/contact', label: 'Contact' },
    // Add more navigation items as needed
  ]; 

function StudentDashboard({ logout, isAuthenticated }) {
    const { studentId } = useParams(); // Get studentId from the URL params
    const [studentData, setStudentData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [showLectureDetails, setShowLectureDetails] = useState(false);
    const [courseData, setCourseData] = useState({});
    
    
    useEffect(() => {
        const fetchStudentCourses = async () => {
            try {
                console.log('Fetching student courses...');
                const data = await fetchCourses(studentId);
                console.log(data);
                setCourses(data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchStudentData = async () => {
            try {
                console.log('Fetching student data...');
                const data = await fetchData(studentId);
                console.log(data);
                setStudentData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudentData();
        fetchStudentCourses();
    }, []);


    const handleViewDetailsClick = (id, name) => {
        setCourseData({
            id: id,
            name: name,
        });
        setShowLectureDetails(true);
    };
    const handleCloseDetailsClick = () => {
        setShowLectureDetails(false);
    }

    const handleLogout = () => {
        logout();
    };

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    // Display loading indicator while waiting for data
    if (studentData === null || courses.length === 0) {
        return <LoadingScreen />;
    }
    console.log(navigationItems);
    return (
        <div className="bg-gray-200 h-[100%]">
            <Navbar navItems={navigationItems}/>
            <div className="max-w-5xl mx-auto py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-semibold mb-4">Student dashboard</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-700"><strong>Name:</strong></p>
                            <p className="text-gray-900">{studentData.student.student_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Email:</strong></p>
                            <p className="text-gray-900">{studentData.student.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Academic Year:</strong></p>
                            <p className="text-gray-900">{studentData.student.academic_year}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Student Year:</strong></p>
                            <p className="text-gray-900">{studentData.student.st_year}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Department:</strong></p>
                            <p className="text-gray-900">{studentData.student.dep_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Enrolled courses:</strong></p>
                            <p className="text-gray-900">{studentData.enrolledCourses}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Suspended courses:</strong></p>
                            <span className={`ml-2 ${studentData.suspendedCourses == 0 ? 'text-green-500' : 'text-red-500'}`}>{studentData.suspendedCourses}</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mt-8 mb-4">Enrolled Courses</h2>
                    <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto py-3 px-4">
                        {courses.map((course) => (
                            <div key={course.co_id}>
                                <CourseDetails course={course} onClick={handleViewDetailsClick} />
                            </div>
                        ))}
                    </div>


                    {showLectureDetails && (
                        <LectureDetails
                            courseId={courseData.id}
                            courseName={courseData.name}
                            studentId={studentId}
                            onCloseButtonClick={handleCloseDetailsClick}
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
