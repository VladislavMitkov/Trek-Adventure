import React, { useState } from "react";

// icons
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

//context
import { UserAuth } from "../context/AuthContext";
import { validateSignIn } from "./SignInValidation";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // signIn func. from context
  const { signIn, signInWithGoogle, user } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const isValid = validateSignIn(email, password, setError);
    if (!isValid) {
      return;
    }
    try {
      await signIn(email, password).then(() => {
        navigate("/");
      });
    } catch (err) {
      setError("User with this email and/or password doesn't exist.");
    }
  };

  const handleSignInWithGoogle = async (e) => {
    try {
      await signInWithGoogle().then(() => {
        navigate("/");
      });
    } catch (error) {
      setError(true);
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

  return (
    <>
      <div className="flex mt-10 mb-10 w-full justify-center items-center">
        <div className="flex flex-col justify-center w-10/12 items-center rounded-xl shadow-xl">
          <div className="flex flex-col justify-center items-center mt-5 border-b  mx-2">
            <h2 className="text-3xl md:text-5xl  text-gray-900 font-sans font-semibold">Sign In</h2>
            <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">Sign In to your account to explore more places.</p>
          </div>
          {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            onClick={handleSignInWithGoogle}
            className="flex justify-center bg-teal-600 transition duration-300 ease-in-out text-white hover:bg-teal-300 w-6/12 mt-10 mb-5 rounded-full border-r-2 p-2 shadow-lg hover:shadow-teal-500 border"
          >
            <label htmlFor="" className="font-sans">
              Sign in with
            </label>
            <FcGoogle className="w-10 h-6 pl-2" />
          </div>
          <p className="mt-2 font-sans text-gray-800 text-center">Or with credentials:</p>
          <form action="#" onSubmit={handleSignIn} className="w-10/12 flex flex-col justify-center items-center mb-10">
            <label htmlFor="email" className="text-gray-700 text-center font-sans font-semibold text-xl">
              email
            </label>
            <input
              type="email"
              placeholder="email"
              className="border w-6/12 border-gray-400 py-1 px-2 rounded-lg"
              value={email}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {error && <p className=" text-red-700 text-center line-clamp-2">Please enter correct email.</p>}
            <label htmlFor="password" className="text-gray-700 text-center font-sans font-semibold text-xl mt-5">
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              className="border rounded-lg w-6/12 border-gray-400 py-1 px-2"
              value={password}
              onKeyDown={handleKeyDown}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className=" text-red-700 text-center line-clamp-2">Invalid password</p>}
            <button
              type="submit"
              className="flex justify-center bg-teal-600 transition duration-300 ease-in-out text-white hover:bg-teal-300  w-6/12 mt-10 mb-5 rounded-full border-r-2 p-2 shadow-lg border"
            >
              Sign In
            </button>
            {error && <p className="text-red-700 text-center line-clamp-2">User with this email and/or password doesn't exist.</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
