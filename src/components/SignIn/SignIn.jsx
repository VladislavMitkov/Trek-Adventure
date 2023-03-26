import React, { useState } from "react";

// icons
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
// toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase/firebase";
//context
import { UserAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const notify = () => toast("You Signed In Successfully");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // signIn func. from context
  const { signIn, signInWithGoogle } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
      notify();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignInWithGoogle = async (e) => {
    setError("");
    try {
      await signInWithGoogle();
      notify();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
                <label htmlFor="username" className="text-gray-600 text-center font-sans font-semibold text-xl">
                  Username
                </label>
                <input type="text" placeholder="Username" className="border border-gray-400 py-1 px-2" />
                <label htmlFor="password" className="text-gray-600 text-center font-sans font-semibold text-xl">
                  Password
                </label>

                <input type="password" placeholder="password" className="border border-gray-400 py-1 px-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="email" className="text-gray-600 text-center font-sans font-semibold text-xl">
                  email
                </label>

                <input
                  type="email"
                  placeholder="email"
                  className="border border-gray-400 py-1 px-2"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="flex justify-center items-center mt-5 mb-5 rounded-xl border border-r-2 p-2 shadow-lg border-blue-200  hover:scale-[1.5] transition duration-300 ease-in-out hover:shadow-blue-600"
                >
                  Sign In
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
