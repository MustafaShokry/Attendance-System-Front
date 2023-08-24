import React from 'react'

const AdminDashboard = (props) => {
    if (!props.isAuthenticated) {
        // Redirect unauthenticated users to the login page
        return <Navigate to="/" />;
    }
    return (
        <div>AdminDashboard</div>
    )
}

export default AdminDashboard