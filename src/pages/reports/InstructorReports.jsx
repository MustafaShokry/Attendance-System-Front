import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for routing
import { useParams } from 'react-router-dom'; // Import useParams

import Navbar from '../../components/Navbar';
import LoadingScreen from '../../components/LoadingScreen';
import { fetchPendingReports, confirmReport, fetchResolvedReports } from '../../api/instructor/reports';




function InstructorWarnings({ logout, isAuthenticated }) {
    const { instructorId } = useParams(); // Get studentId from the URL params
    const [pendingReports, setPendingReports] = useState([]);
    const [resovlvedReports, setResovlvedReports] = useState([]);
    const [emptyPendingReports, setemptyPendingReports] = useState(true);
    const [emptyresovlvedReports, setemptyResovlvedReports] = useState(true);
    const [loading, setLoading] = useState(true);

    const navigationItems = [
        { root: '/', label: 'Home' },
        { root: `/instructor-dashboard/${instructorId}`, label: 'Dashboard' },
        { root: `/instructor-Warnings/${instructorId}`, label: 'Warnings' },
        { root: `/instructor-reports/${instructorId}`, label: 'Reports' },

    ];

    useEffect(() => {
        const fetchInstructorReports = async () => {
            try {
                const data = await fetchPendingReports(instructorId);
                setemptyPendingReports(data.length === 0);
                setPendingReports(data);
                const data2 = await fetchResolvedReports(instructorId);
                setemptyResovlvedReports(data2.length === 0);
                setResovlvedReports(data2);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchInstructorReports();
    }, []);

    const handleConfirmReport = async (id, state) => {
        try {
            console.log(id);
            setLoading(true);
            await confirmReport(id, state);
            const data = await fetchPendingReports(instructorId);
            setemptyPendingReports(data.length === 0);
            setPendingReports(data);
            const data2 = await fetchResolvedReports(instructorId);
            setemptyResovlvedReports(data2.length === 0);
            setResovlvedReports(data2);
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
    if ((resovlvedReports.length === 0 || pendingReports.length === 0) && loading) {
        return <LoadingScreen navigationItems={navigationItems} />;
    }

    return (
        <div className="bg-gray-200 h-[100%]">
            <Navbar navItems={navigationItems} />
            <div className="max-w-5xl mx-auto py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-semibold mb-4">Reports</h1>
                    <h2 className="text-2xl font-semibold mb-4">Pending Reports</h2>
                    {emptyPendingReports && <div className="max-h-[400px] text-center mt-10">No pending reports available ....</div>}
                    {!emptyPendingReports && <div className="max-h-[400px] overflow-y-auto">
                        {pendingReports.map((report, index) => (
                            <div key={index} className="bg-white rounded-lg border shadow-lg p-6 mb-4 mt-2">
                                <h3 className="text-xl font-semibold">report #{index + 1}</h3>
                                <div className="grid grid-cols-3 gap-4 mt-3">
                                    <div>
                                        <p className="text-gray-700"><strong>Student Name:</strong></p>
                                        <p className="text-gray-900">{report.student_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Course Name:</strong></p>
                                        <p className="text-gray-900">{report.co_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Date of Absence:</strong></p>
                                        <p className="text-gray-900">{report.date_of_absent}</p>
                                    </div>
                                    <div className="col-span-4">
                                        <p className="text-gray-700"><strong>Report text:</strong></p>
                                        <p className="text-gray-900">{report.report_text}</p>
                                    </div>

                                    <div className="col-span-3 mt-4 text-center">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mx-10 "
                                            onClick={() => handleConfirmReport(report.report_id, 1)}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md  mx-10 "
                                            onClick={() => handleConfirmReport(report.report_id, 2)}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}


                    <h2 className="text-2xl font-semibold mt-20">Resolved Reports</h2>
                    {emptyresovlvedReports && <div className="max-h-[400px] text-center">No reports resolved ....</div>}
                    {!emptyresovlvedReports && <div className="max-h-[400px] overflow-y-auto">
                        {resovlvedReports.map((report, index) => (
                            <div key={index} className="bg-white border rounded-lg shadow-lg p-6 mb-4 mt-2">
                                <h3 className="text-xl font-semibold">report #{index + 1}</h3>
                                <div className="grid grid-cols-3 gap-4 mt-3">
                                    <div>
                                        <p className="text-gray-700"><strong>Student Name:</strong></p>
                                        <p className="text-gray-900">{report.student_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Course Name:</strong></p>
                                        <p className="text-gray-900">{report.co_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700"><strong>Date of Absence:</strong></p>
                                        <p className="text-gray-900">{report.date_of_absent}</p>
                                    </div>
                                    <div className="col-span-4">
                                        <p className="text-gray-700"><strong>Report text:</strong></p>
                                        <p className="text-gray-900">{report.report_text}</p>
                                    </div>

                                    <div className="col-span-3 mt-4 text-center">
                                        <spanclass className={`${report.state === 1 ? 'text-green-500 hover:text-green-600' : 'text-red-500 hover:text-red-600'}  py-2 px-4`}>{report.state === 1 ? 'Confirmed' : 'Declined'}</spanclass>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}

                    <button
                        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg "
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
