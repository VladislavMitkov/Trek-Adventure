import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import ErrorModal from "../ErrorModal/ErrorModal";

const SignUp = () => {
  const notify = () => toast("You Signed In Successfully");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { createUser, signInWithGoogle } = UserAuth();

  const validateEmail = (email) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 3) {
      setError({
        title: "Invalid input!",
        message: "Please enter a valid username.",
      });
      return;
    }
    if (!validateEmail(email)) {
      setError({
        title: "Invalid Email!",
        message: "Please enter a valid email.",
      });
      return;
    }
    if (password.length < 6) {
      setError({
        title: "Invalid input!",
        message: "Please enter longer password.",
      });
      return;
    }
    try {
      await createUser(username, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };
  // prevent user to enter spaces
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      setError({
        title: "Invalid input!",
        message: "Please don't use spaces.",
      });
      e.preventDefault();
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
    <>
      {error && <ErrorModal onConfirm={() => setError(null)} title={error.title} message={error.message} />}
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
                    placeholder="Username"
                    className="border border-gray-400 py-1 px-2"
                    value={username}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <label htmlFor="password" className="text-gray-600 text-center font-sans font-semibold text-xl">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="password"
                    className="border border-gray-400 py-1 px-2"
                    value={password}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
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
