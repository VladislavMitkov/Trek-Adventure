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
  const [deleteModal, setDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    setIsLoading(true);
    getBlogPostById(id, (blogData) => {
      setBlog(blogData);
      setIsLoading(false);
    });
    // checking if the the author of the blog is the same as currentUser
    const currentUserCheck = async () => {
      await user;
      if (blog?.userId === user.uid) {
        setIsCurrentUser(true);
      }
    };
    currentUserCheck();
  }, [id, blog?.userId, user]);

  // handle delete
  const handleDeleteClick = () => {
    DeleteBlogPost(id);
    navigate(-1);
  };

  return (
    <>
      {deleteModal && (
        <div>
          <div className="relative rounded-lg shadow ">
            <h1>Are you sure you want to delete this post?</h1>
          </div>
          <button onClick={handleDeleteClick} className="shadow-xl p-5 shadow-gray-500 rounded-xl m-2 hover:bg-red-500">
            Delete
          </button>
          <button onClick={() => setDeleteModal(false)} className="shadow-xl p-5 shadow-gray-500 rounded-xl m-2 hover:bg-green-500">
            Cancel
          </button>
        </div>
      )}
      <div className="h-screen">
        {isLoading ? (
          <div className=" mt-56 w-screen justify-center text-center">
            <p className="text-gray-800 text-4xl font-semibold">Loading...</p>
          </div>
        ) : (
          <>
            <main>
              <div className="flex justify-center">
                <img src={blog?.imageUrl} loading="lazy" className="w-[500px] h-[333] m-auto" alt="" />
                {isCurrentUser && (
                  <div className="flex flex-col">
                    <Link to={`/editBlogPost/${id}`} className="shadow-xl shadow-gray-500 rounded-xl mr-3 mt-3 hover:bg-green-200 p-5 flex justify-center items-center">
                      EDIT
                    </Link>
                    <button onClick={() => setDeleteModal(true)} className="shadow-xl shadow-gray-500 rounded-xl mr-3 mt-5 hover:bg-red-300 p-5 flex justify-center items-center">
                      DELETE
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center border truncate items-center w-[70%]">
                <h1>{blog?.title}</h1>
                <h2>{blog?.username}</h2>
                <h3>{blog?.category}</h3>
                <p>{blog?.date}</p>
                <p className="line-clamp-3">{blog?.description}</p>
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
