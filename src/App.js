// react router
import { Routes, Route } from "react-router-dom";
//components
import Footer from "./components/Footer/Footer";
import Home from "./components/MainPage/Home";
import Navbar from "./components/Navigation/Navbar";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

// context
import { AuthContextProvider } from "./components/context/AuthContext";
import AllBlogs from "./components/AllBlogs/AllBlogs";
import MyProfile from "./components/Accounts/MyProfile";
import CreatePost from "./components/CreateBlogPost/CreatePost";

function App() {
	return (
		<>
			<AuthContextProvider>
				<div className="relative flex flex-col h-full bg-slate-400">
					<Navbar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/signIn' element={<SignIn />} />
						<Route path='/signUp' element={<SignUp />} />
						<Route path='/explore' element={<AllBlogs />} />
						<Route path='/myProfile' element={<MyProfile />} />
						<Route path='/createPost' element={<CreatePost />} />
					</Routes>
					<div className=" insent-x-0 bottom-0 justify-center w-full ">
						<Footer />
					</div>
				</div>
			</AuthContextProvider>
		</>
	);
}

export default App;
