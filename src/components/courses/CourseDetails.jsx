import React from 'react';

function CourseDetails({ course, onClick }) {


  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out text-center flex flex-col justify-center items-center">
      <div className="h-16">
        <h2 className={`text-2xl font-semibold ${course.co_name.length < 27 ? 'py-6' :'' } `}>{course.co_name}</h2>
      </div>
      <div className="flex items-center mt-2">
        <p className="text-gray-600">Present days:</p>
        <span className="ml-2 text-green-500">{course.total_attended}</span>
      </div>
      <div className="flex items-center mt-1">
        <p className="text-gray-600">Absent days:</p>
        <span className="ml-2 text-red-500">{course.total_absent}</span>
      </div>
      <div className="flex items-center mt-1">
        <p className="text-gray-600">Status:</p>
        <span className={`ml-2 ${course.status === 'OK' ? 'text-green-500' : 'text-red-500'}`}>{course.status}</span>
      </div>
      <button
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          onClick(course.co_id, course.co_name);
        }}
      >
        View Details
      </button>
    </div>


  );
}

export default CourseDetails;
