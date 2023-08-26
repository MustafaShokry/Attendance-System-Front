import React from 'react';

function Navbar() {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-xl font-semibold">Attendance System</a>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white hover:underline">Home</a></li>
          <li><a href="/about" className="text-white hover:underline">About</a></li>
          <li><a href="/services" className="text-white hover:underline">Services</a></li>
          <li><a href="/contact" className="text-white hover:underline">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
