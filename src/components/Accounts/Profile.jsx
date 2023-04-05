import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
// context
import ShortBlogPost from "../SingleBlogPost/ShortBlogPost";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
const Profile = () => {
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [postsLength, setPostsLength] = useState(0);
  const [postUsername, setPostUsername] = useState(null);

  const { user } = UserAuth();

  useEffect(() => {
    const currentUser = async () => {
      const userRef = await user;

      if (id === user.uid) {
        setIsCurrentUser(true);
      }
    };
    currentUser();
  }, [id, user]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <header className="flex flex-col gap-5">
          <div className="flex gap-5 text-xl font-semibold text-gray-800">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
            <h1>{postUsername}</h1>
          </div>
          <p className="text-center">Posts: {postsLength}</p>
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
            <ShortBlogPost setPostsLength={setPostsLength} setPostUsername={setPostUsername} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
