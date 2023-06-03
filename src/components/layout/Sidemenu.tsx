import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../logo.svg';

function SideMenu() {
  const location = useLocation();

  return (
    <div className="bg-gray-800">
      <div className="min-h-screen sm:w-1/2 md:w-64 h-full bg-gray-900 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl border border-gray-900">
        <img
          src={logo}
          alt="alt placeholder"
          className="w-10 h-10 mx-auto mb-5 rounded-full"
        />
        <ul className="text-gray-700">
          <li
            className={
              location.pathname === "/"
                ? "text-white"
                : "text-gray-300" +
                  "block cursor-pointer p-2 hover:bg-gray-800 hover:text-gray-300"
            }
          >
            <Link to="/">
              <i className="w-8 far fa-address-book p-2 bg-gray-800 rounded-full mx-2"></i>{" "}
              Contacts
            </Link>
          </li>
          <li
            className={
              location.pathname === "/chartmap"
                ? "text-white"
                : "text-gray-300" +
                  "block cursor-pointer p-2 hover:bg-gray-800 hover:text-gray-300"
            }
          >
            <Link to="/chartmap">
              <i className="w-8 fas fa-map-marked-alt p-2   bg-gray-800 rounded-full mx-2"></i>{" "}
              Charts and Map
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
