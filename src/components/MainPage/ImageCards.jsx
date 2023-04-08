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
      {isLoading ? (
        <div className="m-auto text-center">
          <p className="font-semibold text-2xl ">Loading latest blogs...</p>
        </div>
      ) : (
        <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts
            .map((post) => (
              <div key={post.id} className="max-w-sm  border shadow-xl border-gray-200 rounded-lg">
                <div className="flex flex-col">
                  <div className="">
                    <img src={post.imageUrl} alt="" className="w-full h-[220px] object-cover rounded-t-lg" />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
                    <div className="text-xl font-sans truncate mb-5">
                      Created by:
                      <Link to={`/profile/${post.userId}`} className="font-semibold ml-2 hover:text-teal-700 hover:drop-shadow">
                        {post.username}
                      </Link>
                    </div>
                    <Link to={`/detailedBlog/${post.id}`}>
                      <button className="inline-flex mb-3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300">
                        Check it out...
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
            .slice(0, 3)}
        </div>
      )}
      <div className="flex gap-5 w-full text-2xl mt-5  justify-center items-center">
        <Link to="/explore">
          <button type="button" className="border mb-5  shadow-xl rounded-full ml-5 p-5 text-white bg-teal-600 hover:shadow-teal-600 hover:scale-[1.1] transition ease-in-out duration 300">
            Explore more places
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ImageCards;
