import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
const navigationItems = [
  { root: '/', label: 'Home' },
  { root: '/about', label: 'About' },
  { root: '/services', label: 'Services' },
  { root: '/contact', label: 'Contact' },
  // Add more navigation items as needed
]; 

const AdminLogin = (props) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    //todo add validation
    try {
      const adminId = await props.login(username, password);
      if (adminId) {
        navigate(`/admin-dashboard/${adminId}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="bg-gray-100  h-screen overflow-hidden">
      <Navbar navItems={navigationItems}/>
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="bg-white p-8 mt-[-220px] rounded shadow-md w-80">
          <h2 className="text-3xl font-semibold mb-4">Admin Login</h2>
          <input
            type="text"
            placeholder="username"
            className="w-full p-2 border rounded mb-4"
            value={username}
            onChange={(e) => setusername(e.target.value)}
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

export default AdminLogin;
