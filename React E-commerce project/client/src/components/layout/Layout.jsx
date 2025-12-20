import React from 'react';
import AppNavBar from './AppNavBar';
import Footer from './Footer';
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
    return (
        <>
            <AppNavBar />
            <div className="content-container">
                {props.children}
            </div>
            <Toaster position="top-center"/>
            <Footer />
        </>
    );
};

export default Layout;