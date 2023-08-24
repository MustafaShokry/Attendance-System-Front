

function CourseDetails({ course }) {
  return (
    <div className="bg-gray-200 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold">{course.name}</h1>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Description:</strong> {course.description}</p>
      </div>
    </div>
  );
}

export default CourseDetails;
