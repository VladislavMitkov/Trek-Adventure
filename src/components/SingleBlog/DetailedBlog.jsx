import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DeleteBlogPost, getBlogPostById } from "../../firebase/postsApi";
import { UserAuth } from "../context/AuthContext";
import AddComment from "../Comments/AddComment";

const DetailedBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [blog, setBlog] = useState(null);
  const [blogUserId, setBlogUserId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    setIsLoading(true);
    getBlogPostById(id, (blogData) => {
      setBlog(blogData);
      setBlogUserId(blogData?.userId);
      setIsLoading(false);
    });
  }, [id]);

  // checking if the the author of the blog is the same as currentUser
  useEffect(() => {
    if (blogUserId && user && user.uid && blogUserId === user.uid) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [blogUserId, user]);

  // handle delete
  const handleDeleteClick = () => {
    DeleteBlogPost(id);
    navigate(-1);
  };

  return (
    <>
      <div className="font-sans bg-slate-50">
        {isLoading ? (
          <div className=" mt-56 w-screen justify-center text-center">
            <p className="text-gray-800 text-4xl font-semibold">Loading...</p>
          </div>
        ) : (
          <>
            <main>
              <div className="flex justify-center">
                <img src={blog?.imageUrl} loading="lazy" className="w-[500px] h-[333] rounded-xl" alt="" />
              </div>
              <div className="flex justify-center">
                {isCurrentUser && (
                  <div className="flex gap-5 my-2">
                    <Link to={`/editBlogPost/${id}`} className="shadow rounded-xl bg-teal-700 hover:bg-teal-300 text-white p-1 px-2 transition-all ease-in-out duration-300">
                      EDIT
                    </Link>
                    <button onClick={() => setDeleteModal(true)} className="shadow bg-red-700 hover:bg-red-500 text-white rounded-xl p-1 px-2 transition-all ease-in-out duration-300">
                      DELETE
                    </button>
                  </div>
                )}
              </div>
              {deleteModal && (
                <div className="flex justify-center items-center">
                  <div className="">
                    <h1 className="text-red-700 font-semibold">Are you sure you want to delete this post?</h1>
                  </div>
                  <button onClick={handleDeleteClick} className="shadow p-1 px-2 rounded-xl m-2 text-white bg-red-700 hover:bg-red-500">
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="shadow p-1 px-2 bg-teal-600 text-white hover:bg-teal-300  shadow-gray-500 rounded-xl m-2 transition-all ease-in-out duration-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div className="flex flex-col justify-center items-center bg-slate-50">
                <h1 className="text-xl font-semibold text-center ">{blog?.title}</h1>
                <div className="flex justify-between w-8/12">
                  <div className="flex justify-center items-center">
                    <span className="mr-2">Created by:</span>
                    <h2 className="text-xl ">{blog?.username}</h2>
                  </div>
                  <div className="flex justify-center items-center text-gray-800">
                    <span className="mr-2">Category:</span>
                    <h3>{blog?.category}</h3>
                  </div>
                </div>
                <div className="flex justify-end items-end w-8/12 text-gray-800 ">
                  <p>{blog?.date}</p>
                </div>
                <p className="line-clamp-10 mb-5  border-b text-gray-800 mt-2">{blog?.description}</p>
              </div>
            </main>
            <AddComment />
          </>
        )}
      </div>
    </>
  );
};

export default DetailedBlog;
