import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { DeleteBlogPost, getMyPosts } from "../../firebase/postsApi";

// react icons
import { MdEdit, MdDelete } from "react-icons/md";

const SingleBlogPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myPosts, setMyPosts] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getMyPosts().then((data) => {
      setMyPosts(data);
      setIsLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <>
      {myPosts?.map((post) => (
        <div className="bg-blue-300 m-5 flex" key={post.id}>
          <div className="bg-gray-500 grid grid-cols-2 w-[80%]">
            {/* image */}
            <div className=" rounded-xl bg-green-300 m-5">
              <img
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="Blog post"
                className=" object-cover overflow-hidden"
              />
            </div>
            {/* Description */}
            <div className="mx-5 flex flex-col">
              <h1 className="text-2xl border-b text-center">{post.title}</h1>
              <p>Created by:</p>
              <Link className="text-blue-200">{auth?.currentUser?.displayName}</Link>
              <span>{post.category}</span>
              <p>{post.description}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center ml-20 gap-5">
            <button className="rounded-xl bg-slate-800 text-white p-3 hover:bg-green-800 shadow-xl">
              <MdEdit size={25} />
            </button>
            <button onClick={() => DeleteBlogPost(post.id)} className="rounded-xl bg-slate-800 text-white p-3 shadow-xl hover:bg-red-800">
              <MdDelete size={25} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SingleBlogPost;
