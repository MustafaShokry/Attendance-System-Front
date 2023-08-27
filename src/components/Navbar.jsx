import { Link } from 'react-router-dom';

function Navbar({ navItems }) {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">Attendance System</Link>
        <ul className="flex space-x-4">
          {navItems.map((navItem, index) => (
            <li key={index}>
              <Link to={navItem.root} className="text-white hover:underline">{navItem.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

