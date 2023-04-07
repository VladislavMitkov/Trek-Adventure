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

  const { user } = UserAuth();
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
    const currentUser = async () => {
      await user;
      if (id === user.uid) {
        setIsCurrentUser(true);
      }
      setIsLoading(false);
    };
    currentUser();
  }, [id, user]);
  console.log(blogPosts[0])
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-4xl text-gray-800">Loading profile</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <header className="flex flex-col gap-5">
            <div className="flex gap-5 text-xl font-semibold text-gray-800">
              <h1 className="text-2xl text-slate-800">{blogPosts[0]?.username}</h1>
              <h2 className="text-slate-800 text-xl">{blogPosts[0]?.userEmail}</h2>
            </div>
            <p className="text-center">Posts: {blogPosts?.length}</p>
          </header>
          {isCurrentUser && (
            <section className="flex justify-center items-center gap-3 text-xl font-semibold rounded-xl p-2 border border-black shadow-xl hover:shadow-xl hover:shadow-blue-500">
              <Link to="/createPost" className="">
                Create New
              </Link>
              <AiOutlinePlusCircle />
            </section>
          )}
          <main className="text-center">
            <h1 className="text-gray-800 font-semibold text-2xl">My adventures</h1>
            <div className="grid grid-cols-2">
              <Blog blogPosts={blogPosts} isCurrentUser={isCurrentUser}/>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Profile;
