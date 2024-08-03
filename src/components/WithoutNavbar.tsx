import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';

const WithoutNavbar: React.FC = () => {
    return (
        <>
            <Outlet />
        </>
    );

}

export default WithoutNavbar