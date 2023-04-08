import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Blog from "../SingleBlog/Blog";
// context
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getUserBlogs } from "../../firebase/postsApi";

const Profile = () => {
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profileUsername, setProfileUsername] = useState(null);
  const [profileEmail, setProfileEmail] = useState(null);

  const { user } = UserAuth();

  // getting the user blogs...
  useEffect(() => {
    setIsLoading(true);
    getUserBlogs(id, (userBlogsData) => {
      setBlogPosts(
        userBlogsData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setIsLoading(false);
    });
  }, [id]);

  // checking which profile is opened to display user info....
  useEffect(() => {
    const currentUser = async () => {
      await user;
      if (id === user.uid) {
        setProfileUsername(user.displayName);
        setProfileEmail(user.email);
        setIsCurrentUser(true);
      } else {
        setProfileUsername(blogPosts[0]?.username);
        setProfileEmail(blogPosts[0]?.userEmail);
      }
    };
    currentUser();
  }, [user, blogPosts, id]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-4xl text-gray-800">Loading profile</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <header className="flex flex-col">
            <div className="flex flex-col justify-center items-center text-xl font-semibold text-gray-800">
              <h1 className="text-2xl text-slate-800">{profileUsername}</h1>
              <div className="flex">
                <span className="mr-2">Email:</span>
                <h2 className="text-slate-800 text-xl">{profileEmail}</h2>
              </div>
              <p className="text-center">Posts: {blogPosts?.length}</p>
            </div>
          </header>
          {isCurrentUser && (
            <section className="flex justify-center items-center gap-3 text-xl font-semibold rounded-xl p-2 px-3 text-white bg-teal-500 border shadow-xl hover:bg-teal-300">
              <Link to="/createPost" className="">
                Create New
              </Link>
              <AiOutlinePlusCircle />
            </section>
          )}
          <main className="text-center mt-5">
            <h1 className="text-gray-800 font-semibold text-2xl border-b">My adventures</h1>
          </main>
          <div className="w-full">

          <Blog blogPosts={blogPosts} isCurrentUser={isCurrentUser} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
