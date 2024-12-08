import React from "react";
import { Link, NavLink } from "react-router-dom";

// import "./Navbar.css";

const Navbar = () => {
    // Get user data from local storage
    const users = JSON.parse(localStorage.getItem("user"));

    // logout Function
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <>
            <nav class='navbar navbar-expand-lg border-bottom border-2 shadow'>
                <div class='container-fluid'>


                    <div
                        class='nav-links collapse navbar-collapse mx-xl-5'
                        id='navbarSupportedContent'
                    >
                        <ul class='navbar-nav me-auto mb-2 mb-lg-0 w-100 text-center'>
                            <li className='nav-item fs-6 fs-lg-5 mx-lg-3'>
                                <NavLink className='nav-link' exact to='/'>
                                    Home
                                </NavLink>
                            </li>

                            <li className='nav-item fs-6 fs-lg-5 mx-lg-3'>
                                <NavLink className='nav-link' to='/task'>
                                    Task
                                </NavLink>
                            </li>
                        </ul>
                        <form className='d-flex w-25' role='search'>
                            {users ? (
                                <div className='dropdown mt-3 mt-lg-auto w-100 text-center'>
                                    <button
                                        className='btn btn-outline-dark dropdown-toggle'
                                        type='button'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                    >
                                        Welcome {users.firstname}
                                    </button>
                                    <ul className='dropdown-menu'>
                                        <li>
                                            <NavLink className='dropdown-item' to={"/profile"}>
                                                Profile
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='dropdown-item' to={"/orderlist"}>
                                                order
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='dropdown-item' to={"/address"}>
                                                Address
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a onClick={handleLogout} class='dropdown-item' href='#'>
                                                Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <div className='auth-buttons d-flex justify-content-around align-items-sm-center w-100'>
                                    <Link
                                        to='/register'
                                        className='btn btn-sm btn-outline-primary'
                                        type='submit'
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        to='/login'
                                        className='btn btn-outline-success btn-sm'
                                        type='submit'
                                    >
                                        Log In
                                    </Link>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
