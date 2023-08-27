import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for routing
import { useParams } from 'react-router-dom'; // Import useParams

import Navbar from '../../components/Navbar';
import LoadingScreen from '../../components/LoadingScreen';
import { fetchPendingWarnings, confirmWarning, fetchResolvedWarnings } from '../../api/instructor/warnings.js';




function InstructorWarnings({ logout, isAuthenticated }) {
    const { instructorId } = useParams();
    const [pendingWarnings, setPendingWarnings] = useState([]);
    const [resolvedWarnings, setResolvedWarnings] = useState([]);
    const [emptyPendingWarnings, setemptyPendingWarnings] = useState(true);
    const [emptyResolvedWarnings, setemptyResolvedWarnings] = useState(true);
    const [loading, setLoading] = useState(true);

    const navigationItems = [
        { root: '/', label: 'Home' },
        { root: `/instructor-dashboard/${instructorId}`, label: 'Dashboard' },
        { root: `/instructor-Warnings/${instructorId}`, label: 'Warnings' },
        { root: `/instructor-reports/${instructorId}`, label: 'Reports' },

    ];

    useEffect(() => {
        const fetchInstructorWarnings = async () => {
            try {
                const data = await fetchPendingWarnings(instructorId);
                setemptyPendingWarnings(data.length === 0);
                setPendingWarnings(data);
                const data2 = await fetchResolvedWarnings(instructorId);
                setemptyResolvedWarnings(data2.length === 0);
                setResolvedWarnings(data2);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInstructorWarnings();
    }, []);

    const handleConfirmWarning = async (index) => {
        try {
            setLoading(true);
            await confirmWarning(pendingWarnings[index].ssn, pendingWarnings[index].co_id);
            const data = await fetchPendingWarnings(instructorId);
            setemptyPendingWarnings(data.length === 0);
            setPendingWarnings(data);
            const data2 = await fetchResolvedWarnings(instructorId);
            setemptyResolvedWarnings(data2.length === 0);
            setResolvedWarnings(data2);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        logout();
    };

    //   if (!isAuthenticated) {
    //     return <Navigate to="/" />;
    //   }

    // Display loading indicator while waiting for data
    if ((resolvedWarnings.length === 0 || pendingWarnings.length === 0) && loading) {
        return <LoadingScreen navigationItems={navigationItems} />;
    }

    return (
        <div className="bg-gray-200 h-[100%]">
            <Navbar navItems={navigationItems} />
            <div className="max-w-5xl mx-auto py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-semibold mb-4">Warnings</h1>
                    <h2 className="text-2xl font-semibold mb-4">Pending Warnings</h2>
                    {emptyPendingWarnings && <div className="max-h-[400px] text-center mt-20">No pending warnings available ....</div>}
                    {!emptyPendingWarnings && <div className="max-h-[400px] overflow-y-auto">
                        {pendingWarnings.map((warning, index) => (
                            <div key={index} className="bg-white rounded-lg border shadow-lg p-6 mb-4 mt-2">
                                <h3 className="text-xl font-semibold">Warning #{index + 1}</h3>
                                <div className="grid grid-cols-4 gap-4 mt-3">
                                    <div>
                                        <p className="text-gray-700"><strong>Student Name:</strong></p>
                                        <p className="text-gray-900">{warning.student_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Student Year:</strong></p>
                                        <p className="text-gray-900">{warning.student_year}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Student Email:</strong></p>
                                        <p className="text-gray-900">{warning.student_email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Course Name:</strong></p>
                                        <p className="text-gray-900">{warning.course_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Department Name:</strong></p>
                                        <p className="text-gray-900">{warning.department_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Number of Absences:</strong></p>
                                        <p className="text-gray-900">{warning.num_absent}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>State:</strong></p>
                                        <p className="text-gray-900">{warning.state}</p>
                                    </div>
                                    <div className="col-span-4 mt-4 text-center">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mx-auto block"
                                            onClick={() => handleConfirmWarning(index)}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}


                    <h2 className="text-2xl font-semibold mt-20">Confirmed Warnings</h2>
                    {emptyResolvedWarnings && <div className="max-h-[400px] text-center">No warnings confirmed ....</div>}
                    {!emptyResolvedWarnings && <div className="max-h-[400px] overflow-y-auto">
                        {resolvedWarnings.map((warning, index) => (
                            <div key={index} className="bg-white border rounded-lg shadow-lg p-6 mb-4 mt-2">
                                <h3 className="text-xl font-semibold">Warning #{index + 1}</h3>
                                <div className="grid grid-cols-4 gap-4 mt-3">
                                    <div>
                                        <p className="text-gray-700"><strong>Student Name:</strong></p>
                                        <p className="text-gray-900">{warning.student_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Student Year:</strong></p>
                                        <p className="text-gray-900">{warning.student_year}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Student Email:</strong></p>
                                        <p className="text-gray-900">{warning.student_email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Course Name:</strong></p>
                                        <p className="text-gray-900">{warning.course_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Department Name:</strong></p>
                                        <p className="text-gray-900">{warning.department_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Number of Absences:</strong></p>
                                        <p className="text-gray-900">{warning.num_absent}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>State:</strong></p>
                                        <p className="text-gray-900">{warning.state}</p>
                                    </div>
                                    <div className="col-span-4 mt-4 text-center">
                                        <span className=" text-red-500 py-2 px-4 ">Confirmed !!</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}

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

export default InstructorWarnings;
