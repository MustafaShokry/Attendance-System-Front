import React from 'react';
import Navbar from './Navbar';
const navigationItems = [
  { root: '/', label: 'Home' },
  { root: '/about', label: 'About' },
  { root: '/services', label: 'Services' },
  { root: '/contact', label: 'Contact' },
  // Add more navigation items as needed
]; 
function LoadingScreen() {
  
  return (
    <div className="bg-gray-200 h-[100%]">
      <Navbar navItems={navigationItems}/>
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
