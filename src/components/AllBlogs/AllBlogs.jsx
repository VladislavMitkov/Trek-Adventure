import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../firebase/postsApi";
import { UserAuth } from "../context/AuthContext";

const AllBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    setIsLoading(true);
    getAllPosts().then((data) => {
      setPosts(data);
      setCategory(data);
      setIsLoading(false);
    });
  }, []);

  const handleCategoryFilter = (cat) => {
    const filteredPosts = posts.filter((post) => post.category === cat);
    setCategory(filteredPosts);
  };

  return (
    <section className="text-gray-400 body-font">
      {user ? (
        <>
          <h1 className="font-serif text-semibold text-gray-800 text-4xl text-center underline mb-5">Our beautiful world!</h1>
          <div className="container px-5 my-5 mx-auto">
            <div className="flex gap-5 text-2xl text-gray-800 justify-center mb-2">
              <button className="rounded-full bg-slate-300 py-2 px-5 shadow-xl hover:bg-blue-300" onClick={() => setCategory(posts)}>
                All
              </button>
              <button className="rounded-full bg-slate-300 py-2 px-5 shadow-xl hover:bg-blue-300" onClick={() => handleCategoryFilter("mountain")}>
                Mountain
              </button>
              <button className="rounded-full bg-slate-300 py-2 px-5 shadow-xl hover:bg-blue-300" onClick={() => handleCategoryFilter("city")}>
                City
              </button>
              <button className="rounded-full bg-slate-300 py-2 px-5 shadow-xl hover:bg-blue-300" onClick={() => handleCategoryFilter("landmark")}>
                Landmark
              </button>
              <button className="rounded-full bg-slate-300 py-2 px-5 shadow-xl hover:bg-blue-300" onClick={() => handleCategoryFilter("hikingTrail")}>
                Hiking trail
              </button>
            </div>
            <div className="flex flex-wrap -m-4">
              {isLoading && <p className="m-auto mt-36 text-gray-800 font-semibold text-4xl">Loading blogs...</p>}
              {category?.length === 0 && !isLoading && (
                <div className="m-auto mt-36">
                  <p className="text-gray-800 font-semibold text-4xl ">There are no blogs in this category</p>
                </div>
              )}
              {category.map((post) => (
                <div className="p-4 md:w-1/3" key={post.id}>
                  <div className="h-full border-2 border-gray-800 rounded-lg ">
                    <img className="lg:h-72 md:h-36 w-full object-cover overflow-hidden" loading="lazy" src={post.imageUrl} alt="post" />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY : {post.category}</h2>
                      <h1 className="title-font text-lg font-medium text-white mb-3">{post.title}</h1>
                      <Link to={`/profile/${post.userId}`} className="title-font text-lg font-medium text-white mb-3 cursor-pointer">
                        {post.username}
                      </Link>
                      <p className="leading-relaxed mb-3 text-white line-clamp-6">{post.description}</p>
                      <div className="flex items-center flex-wrap ">
                        <Link to={`/fullBlogPost/${post.id}`} className="text-indigo-400 hover:text-indigo-700 hover:scale-[1.25] inline-flex items-center md:mb-2 lg:mb-0">
                          Learn More
                          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center text-gray-800 ">
          <h1 className="text-gray-800 font-semibold text-4xl text-center">You must log in to explore more...</h1>
          <Link to="/signIn" className="text-blue-700">
            Login
          </Link>
          <p>If you don't have account:</p>
          <Link to="/signUp" className="text-blue-700">
            Sign Up
          </Link>
        </div>
      )}
    </section>
  );
};

export default AllBlogs;
