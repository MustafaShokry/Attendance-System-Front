

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">404 - Page Not Found</h2>
        <p className="text-gray-600">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
