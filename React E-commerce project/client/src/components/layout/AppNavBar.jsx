import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../../assets/images/plainb-logo.svg";
import ProductStore from "../../store/ProductStore.js";
import UserStore from "../../store/UserStore.js";
import UserSubmitButton from "../user/UserSubmitButton.jsx";
import CartStore from "../../store/CartStore.js";
import WishStore from "../../store/WishStore.js";

const AppNavBar = () => {
    const { SetSearchKeyword, SearchKeyword } = ProductStore();
    const { isLogin, UserLogoutRequest } = UserStore();
    const { CartCount, CartListRequest } = CartStore();
    const { WishCount, WishListRequest } = WishStore();

    const onLogout = async () => {
        await UserLogoutRequest();
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/";
    };

    useEffect(() => {
        if (isLogin()) {
            CartListRequest();
            WishListRequest();
        }
    }, [isLogin]);

    return (
        <>
            {/* Top Bar */}
            <div className="container-fluid bg-Success text-white py-2 d-none d-md-block">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="small">
                            <i className="bi bi-envelope"></i> Support@PlanB.com
                            <span className="ms-3">
                                <i className="bi bi-telephone"></i> 01774688159
                            </span>
                        </div>
                        <div>
                            <i className="bi bi-whatsapp mx-2"></i>
                            <i className="bi bi-youtube mx-2"></i>
                            <i className="bi bi-facebook mx-2"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3">
                <div className="container">

                    {/* Logo */}
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" width="90" className="img-fluid" />
                    </Link>

                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#nav06"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Area */}
                    <div className="collapse navbar-collapse mt-3 mt-lg-0" id="nav06">

                        {/* Left Nav */}
                        <ul className="navbar-nav me-lg-3 mb-3 mb-lg-0">
                            <li className="nav-item">
                                {/* <Link className="btn btn-light w-100 w-lg-auto" to="/"><i className="bi bi-house"></i> Home </Link> */}
                            </li>
                        </ul>

                        {/* Search */}
                        <div className="flex-grow-1 mb-3 mb-lg-0 ms-4 me-4">
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Search..."
                                    onChange={(e) => SetSearchKeyword(e.target.value)}
                                />
                                <Link
                                    to={SearchKeyword ? `/byKeyword/${SearchKeyword}` : `/`}
                                    className="btn btn-outline-dark"
                                >
                                    <i className="bi bi-search"></i>
                                </Link>
                            </div>
                        </div>

                        {/* Right Buttons */}
                        <div className="d-flex flex-wrap align-items-center justify-content-start justify-content-lg-end gap-2 ms-lg-3">

                            {isLogin() ? (
                                <>
                                    <Link to="/cartList" className="btn btn-light position-relative">
                                        <i className="bi bi-bag"></i>
                                        <span className="badge bg-Success position-absolute top-0 start-100 translate-middle">
                                            {CartCount}
                                        </span>
                                    </Link>

                                    <Link to="/wishList" className="btn btn-light ms-2 position-relative"><i className="bi bi-heart"></i>
                                        <span className="badge bg-warning position-absolute top-0 start-100 translate-middle">
                                            {WishCount}
                                        </span>
                                    </Link>

                                    <Link to="/orders" className="btn ms-2 btn-light"><i className="bi bi-truck"></i></Link>

                                    <UserSubmitButton onClick={onLogout} 
                                        text="Logout"
                                        className="btn btn-Success"
                                    />

                                    <Link to="/profile" className="btn btn-Success">
                                        Profile
                                    </Link>
                                </>
                            ) : (
                                <Link to="/login" className="btn btn-Success w-100 w-lg-auto fw-semibold">
                                    Login
                                </Link>
                            )}

                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default AppNavBar;
