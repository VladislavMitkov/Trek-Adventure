import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../firebase/postsApi";

const ImageCards = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    getAllPosts().then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts
          .map((post) => (
            <div key={post.id} className=" flex flex-col justify-between rounded-xl border border-slate-600  hover:cursor-pointer hover:shadow-2xl hover:shadow-blue-300">
              <div className="w-[320px] h-[350px]">
                <img src={post.imageUrl} alt="" className="w-full h-[200px] object-cover rounded-t-xl " />
                <div className=" text-center">
                  <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
                  <p className="text-xl font-sans truncate">{post.username}</p>
                  <Link to={`/fullBlogPost/${post.id}`}>
                    <button className=" mt-5 p-2 rounded-full px-6 shadow shaodw-2xl shadow-black hover:shadow-blue-400 hover:scale-[1.25] transition duration-300">Learn more...</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
          .slice(0, 3)}
      </div>
      <div className="flex gap-5 w-full text-2xl mt-10  justify-center items-center">
        <Link to="/explore">
          <button type="button" className="border-b border-b-stone-800 shadow-xl shadow-blue-100 rounded-full ml-5 p-5 hover:shadow-blue-400 hover:scale-[1.1] transition ease-in-out duration 300">
            Explore more places
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ImageCards;
