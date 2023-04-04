import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
// context
import ShortBlogPost from "../SingleBlogPost/ShortBlogPost";
import { UserAuth } from "../context/AuthContext";
const MyProfile = () => {
  const { user } = UserAuth();

 
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <header className="flex gap-5">
          <h1>{user.displayName}</h1>
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
          <div>
            <h1>About Me:</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, placeat?</p>
            <p>Posts: </p>
          </div>
        </header>
        <section className="flex justify-center items-center gap-3 text-xl font-semibold rounded-xl p-2 border border-black shadow-xl hover:shadow-xl hover:shadow-blue-500">
          <Link to="/createPost" className="">
            Create New
          </Link>
          <AiOutlinePlusCircle />
        </section>
        <main className="text-center">
          <h1> My blog posts</h1>
          <div className="lg:grid grid-cols-2">
              <ShortBlogPost  />
          </div>
        </main>
      </div>
    </>
  );
};

export default MyProfile;
