import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ContextApi from "../Context/ContextApi";

const Navbar = (props) => {
  const userDetails = useContext(ContextApi);
  let navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const loginHandler = () => {
    navigate("/login");
    return;
  };

  const logoutHandler = () => {
    localStorage.removeItem("TOKEN");
    props.authHandler(false, null, null);
    navigate("/login");
    return;
  };
  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div
            className={"absolute inset-y-0 left-0 flex items-center sm:hidden"}
          >
            <button
              type="button"
              onClick={() => {
                setClicked(!clicked);
              }}
              className={
                "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              }
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <a
                  onClick={() => navigate("/")}
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </a>

                <a
                  onClick={() => navigate("/users")}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Users
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  working on feature
                </a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                {!userDetails.isAuth && (
                  <a
                    onClick={loginHandler}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </a>
                )}
                {!userDetails.isAuth && (
                  <a
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </a>
                )}
                {userDetails.isAuth && (
                  <a
                    onClick={logoutHandler}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </a>
                )}
                {userDetails.isAuth && (
                  <a
                    onClick={() => {
                      navigate(`/myprofile`);
                    }}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </a>
                )}

                {/* <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src="" alt="YOUR DP" />
            </button> */}
              </div>

              {/* <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
          </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className={"sm:hidden"} id="mobile-menu">
        <div
          className={
            clicked ? "block " : "hidden " + "px-2 pt-2 pb-3 space-y-1"
          }
        >
          <a
            onClick={() => {
              setClicked(!clicked);
              navigate("/");
            }}
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Home
          </a>

          <a
            onClick={() => {
              setClicked(!clicked);
              navigate("/users");
            }}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Users
          </a>

          <a
            onClick={() => {
              setClicked(!clicked);
            }}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Working on feature
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
