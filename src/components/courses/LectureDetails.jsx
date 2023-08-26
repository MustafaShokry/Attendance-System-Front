import  { useEffect, useState } from 'react';
import { fetchLectureDetails } from '../../api/student/attendanceDetails.js';


function LectureDetails({ courseId, courseName, studentId, onCloseButtonClick }) {
  const [lectureData, setLectureData] = useState([]);

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        console.log('Fetching lecture details...');
        console.log('Course ID:', courseId);
        console.log('Student ID:', studentId);
        const data = await fetchLectureDetails(courseId, studentId); 
        setLectureData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLectureData();
  }, [courseId, studentId]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">{courseName} Lecture Details</h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            onClick={onCloseButtonClick}
          >
            Close
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-center">Lecture #</th>
              <th className="border border-gray-300 p-2 text-center">Date</th>
              <th className="border border-gray-300 p-2 text-center">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {lectureData.map((lecture, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center bg-white shadow">{index + 1}</td>
                <td className="border border-gray-300 p-2 text-center bg-white shadow">{lecture.date}</td>
                <td className="border border-gray-300 p-2 text-center bg-white shadow">{lecture.attended == true ? 'Present' : 'Absent'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LectureDetails;
