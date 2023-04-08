import React, { useState } from "react";
//react-router
import { Link } from "react-router-dom";
// icons
import { HiMenu } from "react-icons/hi";

// context
import { UserAuth } from "../context/AuthContext";

const imageSrc = require("../../assets/logo.png");

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { user, logout } = UserAuth();

  const handleClick = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err.message);
    }
    setNav(!nav);
  };

  return (
    <div className="mb-2">
      <div className=" flex items-center justify-between sticky bg-teal-600">
        <header className="flex ml-5 justify-center items-center">
          <Link to="/">
            <img src={imageSrc} alt="logo" className="w-20 h-16 lg:mx-6" />
          </Link>
          <span className="lg:text-2xl font-semibold font-sans">TrekAdventure.</span>
        </header>
        <div className="flex items-center mr-10 text-xl font-sans font-semibold ">
          <nav className="md:flex hidden  justify-center items-center">
            <Link className="p-2 mr-10 rounded-full hover:scale-[1.2] hover:text-white transition duration-300" to="/">
              Home
            </Link>
            <Link className="p-2 mr-10 rounded-full hover:scale-[1.2] hover:text-white transition duration-300" to="/explore">
              Explore
            </Link>

            {/*  if user is not logged */}
            {!user && (
              <div className="flex">
                <Link className="p-2 mr-10 rounded-full hover:scale-[1.2] hover:text-white transition duration-300 flex items-center" to="/signIn">
                  Sign In
                </Link>
                <Link className="p-2 mr-10 rounded-full hover:scale-[1.2] hover:text-white transition duration-300" to="/signUp">
                  Sign Up
                </Link>
              </div>
            )}
            {/*  if USER is logged  */}
            {user && (
              <>
                <Link className="p-2 mr-10 rounded-full hover:scale-[1.2] hover:text-white transition duration-300" to={`/profile/${user.uid}`}>
                  My Profile
                </Link>
                <Link className="p-2 mr-10 rounded-full hover:scale-[1.2] hover:text-white transition duration-300" to="/" onClick={handleLogout}>
                  Sign Out
                </Link>
              </>
            )}
          </nav>
          {/* HAMBURGER MENU */}
        </div>

        <HiMenu className="md:hidden flex w-8 h-8 hover:cursor-pointer" onClick={handleClick} />
      </div>
      <div className="">
        {nav && (
          <ul className=" bg-teal-600 w-full px-8 shadow-xl flex flex-col">
            <Link onClick={() => setNav(!nav)} className="p-2 w-full text-center text-white hover:scale-[1.15] transition-all ease-in-out duration-300" to="/">
              Home
            </Link>
            <Link onClick={() => setNav(!nav)} className="p-2 w-full text-center text-white hover:scale-[1.15] transition-all ease-in-out duration-300" to="/explore">
              Explore
            </Link>

            {!user && (
              <>
                <Link onClick={() => setNav(!nav)} className="p-2 w-full text-center text-white hover:scale-[1.15] transition-all ease-in-out duration-300" to="/signIn">
                  Sign In
                </Link>
                <Link onClick={() => setNav(!nav)} className="p-2 w-full text-center text-white hover:scale-[1.15] transition-all ease-in-out duration-300" to="/signUp">
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <>
                <Link onClick={() => setNav(!nav)} className="p-2 w-full text-center text-white hover:scale-[1.15] transition-all ease-in-out duration-300" to={`/profile/${user.uid}`}>
                  My Profile
                </Link>
                <Link onClick={handleLogout} className="p-2 w-full text-center text-white hover:scale-[1.15] transition-all ease-in-out duration-300" to={"/"}>
                  Logout
                </Link>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
