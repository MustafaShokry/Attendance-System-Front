import React from 'react';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchStatistics, fetchAllCourses, fetchCourseDetails } from '../../api/admin/statistics.js';
import CourseCard from '../../components/admin/CourseCard';
import LoadingScreen from '../../components/LoadingScreen';
import AdminDetails from '../../components/admin/AdminDetails';


const AdminDashboard = (props) => {
    const { adminId } = useParams();
    const [courses, setCourses] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [courseData, setCourseData] = useState({});
    const navigationItems = [
        { root: '/', label: 'Home' },
        { root: `/admin-dashboard/${adminId}`, label: 'Dashboard' },
        { root: `/admin-data-entry/${adminId}`, label: 'Data Entry' },
    ];
    useEffect(() => {
        const fetchStatisticsData = async () => {
            try {
                console.log('Fetching statistics data...');
                const data = await fetchStatistics();
                console.log(data);
                setStatistics(data);

                console.log('Fetching courses data...');
                const coursesData = await fetchAllCourses();
                console.log(coursesData);
                setCourses(coursesData);

            } catch (error) {
                console.error(error);
            }
        };
        fetchStatisticsData();
    }, []);

    const handleViewDetailsClick = (courseId, courseName) => {
        setShowDetails(false);
        setCourseData({
            id: courseId,
            name: courseName,
        });
        setShowDetails(true);
    }

    const handleCloseDetailsClick = () => {
        setShowDetails(false);
    }

    // Display loading indicator while waiting for data
    if (statistics === null || statistics === undefined || courses.length === 0) {
        return <LoadingScreen navigationItems={navigationItems} />;
    }

    return (
        <div className="bg-gray-200 h-[100%]">
            <Navbar navItems={navigationItems} />
            <div className="max-w-5xl mx-auto py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-700"><strong>Total Courses:</strong></p>
                            <p className="text-gray-900">{statistics.totalCourses}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Instructors:</strong></p>
                            <p className="text-gray-900">{statistics.totalInstructors}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Departments:</strong></p>
                            <p className="text-gray-900">{statistics.totalDepartments}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Students:</strong></p>
                            <p className="text-gray-900">{statistics.totalStudents}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Credit Students:</strong></p>
                            <p className="text-gray-900">{statistics.creditStudents}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Mainstream Students:</strong></p>
                            <p className="text-gray-900">{statistics.mainstreamStudents}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Pending warnings:</strong></p>
                            <p className="text-gray-900">{statistics.totalPendingWarnings}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Confirmed warnings:</strong></p>
                            <p className="text-gray-900">{statistics.totalConfirmedWarnings}</p>
                        </div>
                        <div>
                            <p className="text-gray-700"><strong>Total Reports:</strong></p>
                            <p className="text-gray-900">{statistics.totalReports}</p>
                        </div>
                        {/* <div>
                            <p className="text-gray-700"><strong>Suspended courses:</strong></p>
                            <span className={`ml-2 ${statistics.suspendedCourses == 0 ? 'text-green-500' : 'text-red-500'}`}>{studentData.suspendedCourses}</span>
                        </div> */}
                    </div>
                    <h2 className="text-xl font-semibold mt-8 mb-4">Courses</h2>
                    <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto py-3 px-4">
                        {courses.map((course) => (
                            <div key={course.courseCode}>
                                <CourseCard course={course} onClick={handleViewDetailsClick} />
                            </div>
                        ))}
                    </div>

                    {showDetails && (
                        <AdminDetails
                            courseId={courseData.id}
                            courseName={courseData.name}
                            onCloseButtonClick={handleCloseDetailsClick}
                        />
                    )}


                    <button
                        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
                        onClick={props.logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
