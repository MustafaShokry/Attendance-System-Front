import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function LandingPage() {
  return (
    <div className='h-screen overflow-hidden'>
      <Navbar />
      <main className="bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold  mb-4">Welcome to the Attendance System</h1>
          <p className="text-xl text-gray-600 mb-8">Choose your role to log in:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/student-login"
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Student
            </Link>
            <Link
              to="/instructor-login"
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Instructor
            </Link>
            <Link
              to="/admin-login"
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Admin
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
