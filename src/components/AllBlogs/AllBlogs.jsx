import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../firebase/postsApi";
import { UserAuth } from "../context/AuthContext";
import { AiOutlineRight } from "react-icons/ai";

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
    <section className="justify-center flex flex-col">
      <h1 className="font-sans text-semibold text-gray-800 text-4xl text-center mb-5 rounded-xl border-b w-6/12 self-center">All Blogs</h1>
      <div className="container px-5 my-5 mx-auto">
        <div className="flex gap-5 text-lg text-white justify-center mb-5">
          <button className="rounded-full bg-teal-600 py-2 px-5 shadow-md hover:bg-teal-300 hover:scale-[1.15]" onClick={() => setCategory(posts)}>
            All
          </button>
          <button className="rounded-full bg-teal-600 py-2 px-5 shadow-md hover:bg-teal-300 hover:scale-[1.15]" onClick={() => handleCategoryFilter("mountain")}>
            Mountain
          </button>
          <button className="rounded-full bg-teal-600 py-2 px-5 shadow-md hover:bg-teal-300 hover:scale-[1.15]" onClick={() => handleCategoryFilter("city")}>
            City
          </button>
          <button className="rounded-full bg-teal-600 py-2 px-5 shadow-md hover:bg-teal-300 hover:scale-[1.15]" onClick={() => handleCategoryFilter("landmark")}>
            Landmark
          </button>
          <button className="rounded-full bg-teal-600 py-2 px-5 shadow-md hover:bg-teal-300 hover:scale-[1.15]" onClick={() => handleCategoryFilter("hikingTrail")}>
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
            <div className="p-2 md:w-1/3 flex flex-col justify-center" key={post.id}>
              <div className="h-full bg-slate-50 shadow-xl rounded-lg">
                <img className="lg:h-[400px] md:h-36 w-full object-cover overflow-hidden p-2 rounded-xl" loading="lazy" src={post.imageUrl} alt="post" />
                <div className="p-2 justify-center items-center">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">CATEGORY : {post.category}</h2>
                  <h1 className="title-font text-lg font-medium mb-3">{post.title}</h1>
                  <div className="flex gap-2">
                    <p>Created by:</p>
                    <Link to={`/profile/${post.userId}`} className="title-font text-lg font-medium mb-1">
                      {post.username}
                    </Link>
                  </div>
                  <p className="leading-relaxed mb-2 line-clamp-6">{post.description}</p>
                  <Link to={`/detailedBlog/${post.id}`} className="flex items-center flex-wrap justify-center md:mb-2 lg:mb-0">
                    <div className="bg-teal-600 text-white p-2 flex justify-center items-center rounded-xl px-6 hover:scale-[1.12] cursor-pointer">
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
    </section>
  );
};

export default AllBlogs;
