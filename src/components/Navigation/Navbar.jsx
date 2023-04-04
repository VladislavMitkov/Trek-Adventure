import React, { useEffect, useState } from "react";
//react-router
import { Link } from "react-router-dom";
// icons
import { HiMenu } from "react-icons/hi";
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const notify = () => toast("You signed out", { autoClose: 2500, theme: "dark" });

  const { user, logout } = UserAuth();

  // useEffect(() => {
  //   async function downloadImage(url) {
  //     const res = await fetch(url);
  //     const blob = await res.blob();
  //     const image = URL.createObjectURL(blob);
  //     console.log("RUN");
  //     setProfileImage(image);
  //   }

  //   if (user?.photoURL) {
  //     downloadImage(user.photoURL);
  //   } else {
  //     setProfileImage(null);
  //   }
  // }, [user]);

  const handleClick = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    try {
      await logout();
      notify();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="shadow-xl mb-2 h-16 w-full flex items-center justify-between sticky top-0 bg-inherit">
      <header className="flex ml-5 justify-center items-center">
        <Link to="/">
          <img src="logo.png" alt="logo" className="w-20 h-16" />
        </Link>
      </header>
      <div className="flex items-center mr-10 text-xl font-sans font-semibold ">
        <nav className="md:flex hidden  justify-center items-center">
          <Link className="p-2 mr-10 rounded-full hover:scale-[1.25] hover:shadow hover:shadow-blue-100 transition duration-300" to="/">
            Home
          </Link>
          <Link className="p-2 mr-10 rounded-full hover:scale-[1.25] hover:shadow hover:shadow-blue-100 transition duration-300" to="/explore">
            Explore
          </Link>

          {/*  if user is not logged */}
          {!user && (
            <div className="flex">
              <Link className="p-2 mr-10 rounded-full hover:scale-[1.25] hover:shadow hover:shadow-blue-100 transition duration-300 flex items-center" to="/signIn">
                Sign In
              </Link>
              <Link className="p-2 mr-10 rounded-full hover:scale-[1.25] hover:shadow hover:shadow-blue-100 transition duration-300" to="/signUp">
                Sign Up
              </Link>
            </div>
          )}
          {/*  if USER is logged  */}
          {user && (
            <>
              {/* <div className="flex justify-center items-center mr-6 w-10 h-10 rounded-2xl border-nofull hover:scale-[1.25] hover:shadow hover:shadow-blue-100 transition duration-300 ease-in-out">
                {profileImage && <img src={profileImage} alt="avatar" className="rounded-2xl" />}
              </div> */}
              <Link className="p-2 mr-10 rounded-full hover:scale-[1.25] hover:shadow hover:shadow-blue-100 transition duration-300" to="/myProfile">
                My Profile
              </Link>
              <Link className="p-2 mr-10 rounded-full hover:scale-[1.25] hover:shadow hover:shadow-blue-100 transition duration-300" to="/" onClick={handleLogout}>
                Sign Out
              </Link>
            </>
          )}
        </nav>
        {/* HAMBURGER MENU */}
        <div className="">
          {nav && (
            <ul className=" bg-[#ffa000] w-full px-8 mt-[260px] shadow-xl flex flex-col">
              <Link className="p-2 border-t-2 w-full border-orange-300" to="/">
                Home
              </Link>
              <Link className="p-2 border-t-2 w-full border-orange-300" to="/xplore">
                Explore
              </Link>
              <Link className="p-2 border-t-2 w-full border-orange-300" to="/myProfile">
                My Places
              </Link>
              <Link className="p-2 border-t-2 w-full border-orange-300" to="/signIn">
                Sign In
              </Link>
              <Link className="p-2 border-t-2 w-full border-orange-300" to="/signUp">
                Sign Up
              </Link>
            </ul>
          )}
        </div>
        <HiMenu className="md:hidden flex w-8 h-8 hover:cursor-pointer" onClick={handleClick} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Navbar;
