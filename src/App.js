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
import Profile from "./components/Accounts/Profile";
import CreatePost from "./components/CreateBlogPost/CreatePost";
import FullBlogPost from "./components/SingleBlogPost/FullBlogPost";
import EditBlogPost from "./components/EditBlogPost/EditBlogPost";

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
						<Route path='/profile/:id' element={<Profile />} />
						<Route path='/createPost' element={<CreatePost />} />
						<Route path="/fullBlogPost/:id" element={<FullBlogPost />} />
						<Route path="/editBlogPost/:id" element={<EditBlogPost />} />
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
