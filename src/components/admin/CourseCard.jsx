/* eslint-disable react/prop-types */

function CourseCard({ course, onClick }) {


  return (
    <div className="bg-white rounded-lg border shadow-lg p-4 hover:shadow-xl transition duration-300 ease-in-out text-center grid grid-cols-2 gap-2">
      <div className="h-13 col-span-2">
        <h2 className={`text-2xl font-semibold ${course.courseName.length < 27 ? 'py-2' :'' } `}>{course.courseName}</h2>
      </div>
      <div className=" mt-2">
        <span className="ml-2 ">{course.departmentName}</span>
      </div>
      <div className=" mt-2">
        <span className="ml-2 ">{course.instructorName}</span>
      </div>
      <div className=" mt-2">
        <p className="text-gray-600">Year</p>
        <span className="ml-2 ">{course.year}</span>
      </div>
      
      <div className=" mt-2">
        <p className="text-gray-600">Total Students</p>
        <span className="ml-2 ">{course.numStudents}</span>
      </div>
      <div className=" mt-2">
        <p className="text-gray-600">Suspended</p>
        <span className="ml-2 ">{course.numSuspendedStudents}</span>
      </div>
      <div className=" mt-2">
        <p className="text-gray-600">Pending warnings</p>
        <span className="ml-2 ">{course.numPendingWarnings}</span>
      </div>
      <div className=" mt-2">
        <p className="text-gray-600">Warnings</p>
        <span className="ml-2 ">{course.numConfirmedWarnings}</span>
      </div>
      <div className=" mt-2">
        <p className="text-gray-600">Reports</p>
        <span className="ml-2 ">{course.numReports}</span>
      </div>
      
      <button
        className="mt-4 col-span-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          onClick(course.courseCode, course.courseName);
        }}
      >
        View Details
      </button>
    </div>


  );
}

export default CourseCard;
