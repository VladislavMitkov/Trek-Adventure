import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteBlogPost } from "../../firebase/postsApi";

const Blog = ({ blogPosts, isCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const settingBlogs = () => {
      setBlogs(blogPosts);
      setIsLoading(false);
    };
    settingBlogs();
  }, [blogPosts]);

  // handle delete
  const handleDeleteClick = (id) => {
    DeleteBlogPost(id);
  };

  return (
    <>
      {isLoading ? (
        <div className="m-auto mt-36 w-screen">
          <p className="text-4xl font-bold text-gray-800">Loading posts...</p>
        </div>
      ) : (
        <>
          {blogs?.map((blog) => (
            <div className="bg-blue-200 m-5" key={blog.id}>
              <div className="bg-gray-500 flex min-w-screen">
                {/* image */}
                <div className=" rounded-xl bg-green-300 m-5 w-1/2 overflow-hidden">
                  <img src={blog.imageUrl} alt="Blog post" className="w-full h-full object-cover" />
                </div>
                {/* Description */}
                <div className="mx-5 flex flex-col w-1/2">
                  <Link to={`/fullBlogPost/${blog.id}`} className="text-3xl font-semibold pb-2 border-b text-center hover:cursor-pointer hover:text-blue-900">
                    {blog.title}
                  </Link>
                  <p className="text-xl pt-2">Created by:</p>
                  <h1 className="text-blue-200 text-2xl font-semibold">{blog.username}</h1>
                  <span>{blog.category}</span>
                  <p className="text-gray-800 pt-2">Description:</p>
                  <p className="truncate text-xl">{blog.description}</p>
                  {deleteModal && (
                    <div>
                      <div className="relative rounded-lg shadow ">
                        <h1>Are you sure you want to delete this post?</h1>
                      </div>
                      <button onClick={() => handleDeleteClick(blog.id)} className="shadow-xl p-5 shadow-gray-500 rounded-xl m-2 hover:bg-red-500">
                        Delete
                      </button>
                      <button onClick={() => setDeleteModal(false)} className="shadow-xl p-5 shadow-gray-500 rounded-xl m-2 hover:bg-green-500">
                        Cancel
                      </button>
                    </div>
                  )}
                  {isCurrentUser && (
                    <div>
                      <Link to={`/editBlogPost/${blog.id}`} className="shadow-xl shadow-gray-500 rounded-xl mr-3 mt-3 hover:bg-green-200 p-5 flex justify-center items-center">
                        EDIT
                      </Link>
                      <button onClick={() => setDeleteModal(true)} className="shadow-xl shadow-gray-500 rounded-xl mr-3 mt-5 hover:bg-red-300 p-5 flex justify-center items-center">
                        DELETE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Blog;
