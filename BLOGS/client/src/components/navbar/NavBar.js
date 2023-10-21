import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import "./NavBar.css";

const NavBar = () => {
  const [localValue, setLocalValue] = useState();
  const [click, setClick] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLocalValue(localStorage.getItem("authToken"));
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };
  const toggle = () => {
    var element = document.getElementById("navbar");
    element.classList.toggle("active");
    setClick(!click);
  };
  return (
    <div className="">
      <nav className="flex justify-between items-center bg-pink-400 h-16">
        <div className="font-bold text-2xl italic px-3 py-2 text-slate-700 rounded-lg">
          <Link to="/">BLOGS</Link>
        </div>
        {localValue ? (
          <div className="flex justify-end items-center p-3 pr-6 cursor-pointer">
            {click ? (
              <div onClick={toggle} className="text-2xl">
                <FiMenu className="" />
              </div>
            ) : (
              <div onClick={toggle} className="text-2xl">
                <RxCross2 className="" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between items-center  space-x-4 h-16 mx-2 text-base font-semibold">
            <div className="flex">
              <div className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                <Link to="/login">Login</Link>
              </div>
              <div className="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
                <Link to="/register">Signup</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {localValue ? (
        <ul
          id="navbar"
          className="navbar absolute flex-col justify-center leading-loose bg-pink-400 h-1/2 w-64 p-4 mt-3 mr-3 z-50 text-white text-lg font-semibold"
        >
          <li className="pb-4">
            <Link to="/" onClick={toggle} className="hover:text-black">
              Home
            </Link>
          </li>
          <li className="pb-4">
            <Link
              to="/create-blog"
              onClick={toggle}
              className="hover:text-black"
            >
              Create Blog
            </Link>
          </li>
          <li className="pb-4">
            <Link to="/my-blogs" onClick={toggle} className="hover:text-black">
              My Blogs
            </Link>
          </li>
          <li className="pb-4">
            <Link to="/" onClick={handleLogout} className="hover:text-black">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;
