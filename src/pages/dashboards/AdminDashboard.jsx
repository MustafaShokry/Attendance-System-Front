import React from 'react'
import Navbar from '../../components/Navbar';
import { Navigate } from 'react-router-dom';
const AdminDashboard = (props) => {
    const navigationItems = [
        { root: '/', label: 'Home' },
        { root: '/about', label: 'About' },
        { root: '/services', label: 'Services' },
        { root: '/contact', label: 'Contact' },
        // Add more navigation items as needed
      ]; 
    if (!props.isAuthenticated) {
        // Redirect unauthenticated users to the login page
        return <Navigate to="/" />;
    }
    return (
        <>
        <Navbar navItems={navigationItems} />
        <div>AdminDashboard</div>
        
        </>
    )
}

export default AdminDashboard