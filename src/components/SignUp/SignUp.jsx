import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../context/AuthContext";
import { validateForm } from "./SignUpValidation";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { createUser, signInWithGoogle, user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(username, email, password, setError);
    if (!isValid) {
      return;
    }
    try {
      await createUser(username, email, password).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  // prevent user to enter spaces
  const handleKeyDown = (e) => {
    setError(false);
    if (e.key === " ") {
      setError({
        title: "Invalid input!",
        message: "Please don't use spaces.",
      });
      e.preventDefault();
    }
  };

  const handleSignInWithGoogle = async (e) => {
    try {
      await signInWithGoogle().then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex mt-10 mb-10 w-full justify-center items-center">
        <div className="flex flex-col justify-center w-10/12 items-center rounded-xl shadow-xl">
          <div className="flex flex-col justify-center items-center mt-5 border-b-2 mx-2">
            <h2 className="text-3xl md:text-5xl  text-gray-800 font-sans font-semibold">Sign Up</h2>
            <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">Create your account. It's free and only take a minute.</p>
          </div>
          {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            onClick={handleSignInWithGoogle}
            className="flex justify-center bg-teal-600 transition duration-300 ease-in-out text-white hover:bg-teal-300 w-6/12 mt-10 mb-5 rounded-full border-r-2 p-2 shadow-lg hover:shadow-teal-500 border"
          >
            <label className="font-sans">Sign In with</label>
            <FcGoogle className="w-10 h-6 " />
          </div>
          <p className="mt-2 font-sans text-gray-800 text-center">Or with credentials:</p>
          <form action="#" onSubmit={handleSubmit} className="w-10/12 flex flex-col justify-center items-center mb-10">
            <label htmlFor="username" className="text-gray-700 text-center font-sans font-semibold text-xl">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="border w-6/12 border-gray-400 py-1 px-2 rounded-lg"
              value={username}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {error && <p className="text-red-700 text-center line-clamp-2">Your username must be longer than 3 symbols and spaces can't be used</p>}
            <label htmlFor="password" className="text-gray-700 text-center font-sans font-semibold text-xl mt-5">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="password"
              className="border rounded-lg w-6/12 border-gray-400 py-1 px-2"
              value={password}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error && <p className="text-red-700 text-center line-clamp-2">Password must be longer than 6 symbols</p>}
            <label htmlFor="email" className="text-gray-600 text-center font-sans font-semibold text-xl mt-5">
              email
            </label>
            <input
              type="email"
              placeholder="email"
              className="border rounded-lg w-6/12 border-gray-400 py-1 px-2"
              value={email}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {error && <p className=" text-red-700 text-center line-clamp-2">Please enter correct email.</p>}
            <button className="flex justify-center bg-teal-600 transition duration-300 ease-in-out text-white hover:bg-teal-300 w-6/12 mt-10 mb-5 rounded-full border-r-2 p-2 shadow-lg border">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
