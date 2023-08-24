import { Navigate } from 'react-router-dom'; // Import Navigate for routing

function StudentDashboard(props) {
    // Sample student data (replace with actual data from your backend)
    const studentData = {
        name: 'John Doe',
        email: 'john@example.com',
        academicYear: '2023',
        studentYear: 'Junior',
        departmentName: 'Computer Science',
        enrolledCourses: [
            {
                id: 1,
                name: 'Course 1',
                instructor: 'Instructor 1',
                description: 'Course description 1',
            },
            {
                id: 2,
                name: 'Course 2',
                instructor: 'Instructor 2',
                description: 'Course description 2',
            },
            // Add more courses as needed
        ],
    };

    const handleCourseClick = (course) => {
        // Handle course click, e.g., navigate to course details page
    };

    const handleLogout = () => {
        props.logout();
    };

    // Check if the user is authenticated
    if (!props.isAuthenticated) {
        // Redirect unauthenticated users to the login page
        return <Navigate to="/" />;
    }

    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="max-w-5xl mx-auto py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-semibold mb-4">Student Profile</h1>
                    <div className="mb-4">
                        <p><strong>Name:</strong> {studentData.name}</p>
                        <p><strong>Email:</strong> {studentData.email}</p>
                        <p><strong>Academic Year:</strong> {studentData.academicYear}</p>
                        <p><strong>Student Year:</strong> {studentData.studentYear}</p>
                        <p><strong>Department:</strong> {studentData.departmentName}</p>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
                    <ul>
                        {studentData.enrolledCourses.map((course) => (
                            <li key={course.id} className="mb-2">
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => handleCourseClick(course)}
                                >
                                    {course.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
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
