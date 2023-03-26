import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../firebase/postsApi";
// context
import { UserAuth } from "../context/AuthContext";
const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    setIsLoading(true);
    getAllPosts().then((data) => {
      const myPosts = data.filter((post) => post.userId === user.uid);
      setPosts(myPosts);
      setIsLoading(false);
    });
  },);


  return (
    <div className="flex flex-col justify-center items-center">
      <header className="flex gap-5">
        <h1>{user.email}</h1>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
          <h1>About Me:</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, placeat?</p>
          <p>Posts: 5</p>
        </div>
      </header>
      <section className="flex justify-center items-center gap-3 text-xl font-semibold rounded-xl p-2 border border-black shadow-xl hover:shadow-xl hover:shadow-blue-500">
        <Link to="/createPost" className="">
          Create New
        </Link>
        <AiOutlinePlusCircle />
      </section>
      <main>
        <h1> My blog posts</h1>
        <div>
          {posts?.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
