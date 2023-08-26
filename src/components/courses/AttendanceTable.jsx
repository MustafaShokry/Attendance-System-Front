

import React, { useState } from 'react';

function AttendanceTable({ attendanceData, courseName, courseId, onCloseButtonClick, onSaveChangesClick }) {
  const [editableData, setEditableData] = useState([...attendanceData]);
  const [statusMessage, setStatusMessage] = useState(null);


  const handleAttendanceChange = (studentIndex, dateIndex, attended) => {
    const updatedData = [...editableData];
    updatedData[studentIndex].attendance[dateIndex].attended = attended;
    setEditableData(updatedData);
  };

  const handleSaveChanges = () => {
    // Call the onSaveChangesClick function with the updated data
    onSaveChangesClick(courseId, editableData).then(() => {
        setStatusMessage('Changes saved successfully.');
      })
      .catch((error) => {
        setStatusMessage(`Error saving changes: ${error.message}`);
      });
  };

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
              <th className="border border-gray-300 p-2 text-center">Student Name</th>
              {attendanceData[0].attendance.map((attendance, dateIndex) => (
                <th
                  key={attendance.date}
                  className="border border-gray-300 p-2 text-center"
                >
                  {attendance.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {editableData.map((student, studentIndex) => (
              <tr key={student.student.ssn}>
                <td className="border border-gray-300 p-2 text-center bg-white shadow">
                  {student.student.student_name}
                </td>
                {student.attendance.map((attendance, dateIndex) => (
                  <td
                    key={attendance.date}
                    className="border border-gray-300 p-2 text-center"
                  >
                    <select
                      className={`w-full p-1 ${
                        attendance.attended ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                      value={attendance.attended ? 'Present' : 'Absent'}
                      onChange={(e) =>
                        handleAttendanceChange(
                          studentIndex,
                          dateIndex,
                          e.target.value === 'Present'
                        )
                      }
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        { (
          <p className="mt-4 text-center text-green-600">{statusMessage}</p>
        )}
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AttendanceTable;

// import React, { useState } from 'react';

// function AttendanceTable({ attendanceData, courseName, onCloseButtonClick, onSaveChangesClick }) {
//   const [editableData, setEditableData] = useState([...attendanceData]);
//   const [statusMessage, setStatusMessage] = useState(null);

//   const handleAttendanceChange = (studentIndex, dateIndex, attended) => {
//     const updatedData = [...editableData];
//     updatedData[studentIndex].attendance[dateIndex].attended = attended;
//     setEditableData(updatedData);
//   };

//   const handleSaveChanges = () => {
//     // Call the onSaveChangesClick function with the updated data
//     onSaveChangesClick(editableData)
//       .then(() => {
//         setStatusMessage('Changes saved successfully.');
//       })
//       .catch((error) => {
//         setStatusMessage(`Error saving changes: ${error.message}`);
//       });
//   };

//   return (
//     <div className="max-w-5xl mx-auto py-8">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-3xl font-semibold">{courseName} Lecture Details</h1>
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
//             onClick={onCloseButtonClick}
//           >
//             Close
//           </button>
//         </div>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2 text-center">Student Name</th>
//               {attendanceData[0].attendance.map((attendance, dateIndex) => (
//                 <th
//                   key={attendance.date}
//                   className="border border-gray-300 p-2 text-center"
//                 >
//                   {attendance.date}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {editableData.map((student, studentIndex) => (
//               <tr key={student.student.ssn}>
//                 <td className="border border-gray-300 p-2 text-center bg-white shadow">
//                   {student.student.student_name}
//                 </td>
//                 {student.attendance.map((attendance, dateIndex) => (
//                   <td
//                     key={attendance.date}
//                     className="border border-gray-300 p-2 text-center"
//                   >
//                     <select
//                       className={`w-full p-1 ${
//                         attendance.attended ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                       }`}
//                       value={attendance.attended ? 'Present' : 'Absent'}
//                       onChange={(e) =>
//                         handleAttendanceChange(
//                           studentIndex,
//                           dateIndex,
//                           e.target.value === 'Present'
//                         )
//                       }
//                     >
//                       <option value="Present">Present</option>
//                       <option value="Absent">Absent</option>
//                     </select>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {statusMessage && (
//           <p className="mt-4 text-center text-green-600">{statusMessage}</p>
//         )}
//         <button
//           className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
//           onClick={handleSaveChanges}
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AttendanceTable;

