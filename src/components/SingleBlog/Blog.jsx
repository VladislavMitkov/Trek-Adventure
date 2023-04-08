import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteBlogPost } from "../../firebase/postsApi";

import { AiOutlineRight } from "react-icons/ai";

const Blog = ({ blogPosts, isCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

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
    <section className="justify-center flex flex-col">
      {isLoading ? (
        <div className="m-auto mt-36 w-screen">
          <p className="text-4xl font-bold text-gray-800">Loading posts...</p>
        </div>
      ) : (
        <div className="container px-5 my-5 mx-auto">
          <div className="flex flex-wrap -m-4">
            {blogs.map((blog) => (
              <div className="p-2 md:w-1/3 flex flex-col justify-center" key={blog.id}>
                <div className="h-full bg-slate-50 shadow-xl rounded-lg">
                  <img className="lg:h-[400px] md:h-36 w-full object-cover overflow-hidden p-2 rounded-xl" loading="lazy" src={blog.imageUrl} alt="post" />
                  <div className="p-2 justify-center items-center">
                    <div className="flex justify-between">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY : {blog.category}</h2>
                      {isCurrentUser && (
                        <div>
                          <Link to={`/editBlogPost/${blog.id}`} className="bg-teal-600 text-white rounded-xl p-1 px-2 ml-2 hover:bg-teal-300 transition-all ease-in-out duration-300">
                            EDIT
                          </Link>
                          <button onClick={() => handleDeleteClick(blog.id)} className="bg-red-700 text-white rounded-xl p-1 px-2 ml-2 hover:bg-red-400 transition-all ease-in-out duration-300">
                            DELETE
                          </button>
                        </div>
                      )}
                    </div>

                    <Link to={`/detailedBlog/${blog.id}`} className="text-3xl font-semibold pb-2 text-center hover:cursor-pointer">
                      {blog.title}
                    </Link>
                    <div className="flex gap-2 items-center">
                      <p>Created by:</p>
                      <h2 className="title-font text-lg font-medium">{blog.username}</h2>
                    </div>
                    <p className=" line-clamp-2 p-2">{blog.description}</p>
                    <Link to={`/detailedBlog/${blog.id}`} className="flex items-center flex-wrap justify-center md:mb-2 lg:mb-0">
                      <div className="bg-teal-600 text-white p-2 flex justify-center items-center rounded-xl px-6 hover:bg-teal-300 transition-all ease-in-out duration-300 cursor-pointer">
                        Check it out
                        <AiOutlineRight className="w-4 h-4 ml-2" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
