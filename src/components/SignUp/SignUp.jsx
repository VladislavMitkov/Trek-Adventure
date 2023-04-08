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

  const { createUser, signInWithGoogle } = UserAuth();

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
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="h-screen">
        <div className=" box-border flex justify-center mt-10">
          <div className="flex w-8/12 justify-center rounded-xl shadow-xl shadow-blue-100">
            <div className=" flex flex-col items-center ">
              <div className="flex flex-col justify-center items-center mt-5 border-b-2 mx-2">
                <h2 className="text-3xl md:text-5xl  text-gray-800 font-sans font-semibold">Sign Up</h2>
                <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">Create your account. It's free and only take a minute.</p>
              </div>
              <button className="flex justify-center items-center mt-10 mb-5 rounded-xl border border-r-2 p-2 w-6/12 shadow-lg border-blue-200  hover:scale-[1.5] transition duration-300 ease-in-out hover:shadow-blue-600">
                Sign In with
                <div className="pl-2">
                  <FcGoogle className="w-10 h-6 " onClick={handleSignInWithGoogle} />
                </div>
              </button>
              <p className="mt-3">Or with credentials:</p>
              <form action="#" onSubmit={handleSubmit}>
                <div className="flex flex-col w-full mb-5 mt-5">
                  <label htmlFor="username" className="text-gray-600 text-center font-sans font-semibold text-xl">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    className=" border border-gray-400 py-1 px-2"
                    value={username}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  {error && <p className="text-red-700 font-light">Your username must be longer than 3 symbols and spaces can't be used</p>}
                  <label htmlFor="password" className="text-gray-600 text-center font-sans font-semibold text-xl">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="border border-gray-400 py-1 px-2"
                    value={password}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  {error && <p className=" text-red-700 font-light line-clamp-2">Password must be longer than 6 symbols</p>}
                  <label htmlFor="email" className="text-gray-600 text-center font-sans font-semibold text-xl">
                    email
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="border border-gray-400 py-1 px-2"
                    value={email}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {error && <p className=" text-red-700 font-light line-clamp-2">Please enter correct email.</p>}
                  <button className="flex justify-center items-center mt-5 mb-5 rounded-xl border border-r-2 p-2 shadow-lg border-blue-200  hover:scale-[1.5] transition duration-300 ease-in-out hover:shadow-blue-600">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
