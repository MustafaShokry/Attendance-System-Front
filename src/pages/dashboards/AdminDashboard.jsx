import React from 'react'
import Navbar from '../../components/Navbar';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AdminDashboard = (props) => {
    const { adminId } = useParams();
    const navigationItems = [
        { root: '/', label: 'Home' },
        { root: `/admin-dashboard/${adminId}`, label: 'Dashboard' },
        { root: `/admin-data-entry/${adminId}`, label: 'Data Entry' },
    ];
    if (!props.isAuthenticated) {
        // Redirect unauthenticated users to the login page
        return <Navigate to="/" />;
    }
    return (
        <div className="bg-gray-200 h-[100%]">
            <Navbar navItems={navigationItems} />
            <div className="flex h-screen justify-center items-center bg-gray-100">
                <div className="bg-white p-8 mt-[-220px] rounded shadow-md w-80">

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard