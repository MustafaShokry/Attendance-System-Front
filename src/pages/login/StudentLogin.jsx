/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
const navigationItems = [
  { root: '/', label: 'Home' },
  { root: '/student-login', label: 'Student' },
  { root: '/instructor-login', label: 'Instructor' },
  { root: '/admin-login', label: 'Admin' },
];
const StudentLogin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const studentId = await props.login(email, password);
      navigate(`/student-dashboard/${studentId}`);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="bg-gray-100  h-screen overflow-hidden">
      <Navbar navItems={navigationItems} />
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white p-8 mt-[-220px] rounded shadow-md w-80">
          <h2 className="text-3xl font-semibold mb-4">Student Login</h2>
          <input
            type="text"
            placeholder="Email"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
