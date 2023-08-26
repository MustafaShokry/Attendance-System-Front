
function InstructorCourseDetails({ course, onDetailsClick, onDownloadClick }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border p-6 hover:shadow-xl transition duration-300 ease-in-out text-center flex flex-col justify-center items-center">
      <div className="h-16">
        <h2 className={`text-2xl font-semibold ${course.co_name.length < 27 ? 'py-6' : ''}`}>{course.co_name}</h2>
      </div>
      <div className="flex items-center mt-2">
        <p className="text-gray-600">Total students:</p>
        <span className="ml-2 text-green-500">{course.numStudents}</span>
      </div>
      <div className="flex items-center mt-1">
        <p className="text-gray-600">Suspended students:</p>
        <span className={`ml-2 ${course.numSuspendedStudents === 0 ? 'text-green-500' : 'text-red-500'}`}>{course.numSuspendedStudents}</span>
      </div>
      <div className="flex mt-4">
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            onDetailsClick(course.co_id);
          }}
        >
          View Details
        </button>
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
          onClick={() => {
            onDownloadClick(course.co_id);
          }}
        >
          Download
        </button>
      </div>
    </div>

  );
}

export default InstructorCourseDetails;
