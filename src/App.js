import React from "react";
// react router
import { Routes, Route } from "react-router-dom";
//components
import Footer from "./components/Footer/Footer";
import Home from "./components/MainPage/Home";
import Navbar from "./components/Navigation/Navbar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Accounts/Profile";
import CreatePost from "./components/CreateBlogPost/CreatePost";
import EditBlogPost from "./components/EditBlogPost/EditBlogPost";
import DetailedBlog from "./components/SingleBlog/DetailedBlog";
import AllBlogs from "./components/AllBlogs/AllBlogs";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// context
import { AuthContextProvider } from "./components/context/AuthContext";

function App() {
	return (
		<>
			<AuthContextProvider>
				<div className="flex flex-col h-screen">
					<Navbar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/signIn' element={<SignIn />} />
						<Route path='/signUp' element={<SignUp />} />
						<Route path="/" element={<PrivateRoute />}>
							<Route path='/profile/:id' element={<Profile />} />
							<Route path='/explore' element={<AllBlogs />} />
							<Route path='/createPost' element={<CreatePost />} />
							<Route path="/detailedBlog/:id" element={<DetailedBlog />} />
							<Route path="/editBlogPost/:id" element={<EditBlogPost />} />
						</Route>
					</Routes>
					<div className="insent-x-0 bottom-0 justify-center w-full">
						<Footer />
					</div>
				</div>
			</AuthContextProvider>
		</>
	);
}

export default App;
