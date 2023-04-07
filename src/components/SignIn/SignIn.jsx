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
  const { signIn, signInWithGoogle } = UserAuth();

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
      <div className="h-screen">
        <div className=" box-border  flex justify-center mt-10">
          <div className="flex w-8/12 justify-center bg-slate-300 rounded-xl shadow-xl shadow-blue-100">
            <div className=" flex flex-col items-center ">
              <div className="flex flex-col justify-center items-center mt-5 border-b-2 border-slate-500 mx-2">
                <h2 className="text-3xl md:text-5xl  text-gray-800 font-sans font-semibold">Sign In</h2>
                <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">Sign In to your account to explore more places.</p>
              </div>
              <div className="flex justify-center items-center mt-10 mb-5 border border-r-2 p-2 w-8/12 shadow-lg border-slate-500">
                <label htmlFor="" className="font-sans text-gray-800">
                  Sign in with
                </label>
                <div className="pl-2 hover:scale-[1.5] transition duration-300 ease-in-out">
                  <FcGoogle className="w-10 h-6 " onClick={handleSignInWithGoogle} />
                </div>
              </div>
              <p className="mt-3">Or with credentials:</p>
              <form action="#" onSubmit={handleSignIn}>
                <div className="flex flex-col w-full mb-5 mt-5">
                  <label htmlFor="email" className="text-gray-600 text-center font-sans font-semibold text-xl">
                    email
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className=" border border-gray-400 py-1 px-2"
                    value={email}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {error && <p className=" text-red-700 font-light line-clamp-2">Please enter correct email.</p>}
                  <label htmlFor="password" className="text-gray-600 text-center font-sans font-semibold text-xl">
                    Password
                  </label>
                  <input type="password" placeholder="password" className="border border-gray-400 py-1 px-2" value={password} onKeyDown={handleKeyDown} onChange={(e) => setPassword(e.target.value)} />
                  {error && <p className=" text-red-700 font-light line-clamp-2">Invalid password</p>}
                  <button
                    type="submit"
                    className="flex justify-center items-center mt-5 mb-5 rounded-xl border border-r-2 p-2 shadow-lg border-blue-200  hover:scale-[1.5] transition duration-300 ease-in-out hover:shadow-blue-600"
                  >
                    Sign In
                  </button>
                  {error && <p className="text-red-700 font-light">User with this email and/or password doesn't exist.</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
