import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingScreen from '../../components/LoadingScreen';
import { fetchStudentCourses } from '../../api/student/courses';
import { submitIllnessReport } from '../../api/student/report';
import { set } from 'date-fns';

function formatDate(dbDateString) {
    const dbDate = new Date(dbDateString);

    const year = dbDate.getFullYear();
    const month = String(dbDate.getMonth() + 1).padStart(2, '0');
    const day = String(dbDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}


function IllnessReportForm() {
    const { studentId } = useParams();
    const [reportText, setReportText] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);
    const [statusType, setStatusType] = useState(null);

    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    const navigationItems = [
        { root: '/', label: 'Home' },
        { root: `/student-dashboard/${studentId}`, label: 'Dashboard' },
        { root: `/student-report/${studentId}`, label: 'Report Illness' },
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await fetchStudentCourses(studentId);
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
    }, []);

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage(null);
        setStatusType(null);

        try {
            const date = formatDate(selectedDate);

            submitIllnessReport(studentId, selectedCourse.value, date, reportText, attachment).then((response) => {
                setStatusMessage('Illness report submitted successfully');
                setStatusType('success');
                setReportText('');
                setAttachment(null);
                setSelectedDate(null);
                setSelectedCourse(null);
            })
                .catch((error) => {
                    if (error.response.status === 400 || error.response.status === 404) {
                        // console.error('Error submitting illness report:', error.response.data.message);
                        setStatusMessage(error.response.data.message);
                        setStatusType('error');

                    } else {
                        console.error('Error submitting illness report:', error);
                    }
                });

        } catch (error) {
            console.error('Error submitting illness report:', error);
        }
    };

    // Create options for the Select component based on the provided courses
    const courseOptions = courses.map((course) => ({
        value: course.co_id,
        label: course.co_name,
    }));

    if (courses.length === 0 && loading) {
        return <LoadingScreen navigationItems={navigationItems}/>;
    }

    return (
        <div className="bg-gray-200 h-[100%]">
            <Navbar navItems={navigationItems} />
            <div className="max-w-5xl mx-auto py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-semibold mb-4">Report an illness</h1>
                    <form onSubmit={handleReportSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Date of Absence</label>
                            <DatePicker
                                isClearable
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-600 "
                                dateFormat="yyyy-MM-dd"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Select a Course</label>
                            <Select
                                options={courseOptions} // Use the courseOptions array
                                value={selectedCourse}
                                isClearable={true}
                                isSearchable={true}
                                required
                                onChange={(course) => setSelectedCourse(course)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Report Text</label>
                            <textarea
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                rows="4"
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Attachment</label>
                            <input
                                type="file"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                onChange={(e) => setAttachment(e.target.files[0])}
                            />
                        </div>
                        {statusMessage && (
                            <p className={`mt-4 text-center ${statusType == 'error' ? 'text-red-600' : 'text-green-600'}`}>{statusMessage}</p>
                        )}
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md"
                            >
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default IllnessReportForm;
