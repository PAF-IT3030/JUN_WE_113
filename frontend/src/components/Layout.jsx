import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
    const location = useLocation();
    const hideSidebarOnPaths = ['/', '/signup'];

    return (
        <>
            {!hideSidebarOnPaths.includes(location.pathname) && <Sidebar />}
            <div>
                <Outlet />
            </div>
        </>
    );  
}

export default Layout;