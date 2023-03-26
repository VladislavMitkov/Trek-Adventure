import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getAllPosts } from "../../firebase/postsApi";

const ImageCards = () => {
  const places = [
    {
      id: 1,
      name: "Vihren",
      author: "Pesho",
      imageUrl: "https://images.unsplash.com/photo-1646912177963-086dcab5180e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
    },
    {
      id: 2,
      name: "Musala",
      author: "Ivan",
      imageUrl: "https://www.infopointbg.com/media/7/2448.jpg",
    },
    {
      id: 3,
      name: "Melnik pyramids",
      author: "ivan",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/%D0%98%D0%B7%D0%B2%D0%B0%D1%8F%D0%BD%D0%BE_%D0%BE%D1%82_%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0%D1%82%D0%B0-%D0%BD%D0%B0%D0%B4_%D0%9C%D0%B5%D0%BB%D0%BD%D0%B8%D0%BA-%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F-%D0%A1%D1%82%D0%BE%D1%8F%D0%BD_%D0%9F%D0%B5%D1%82%D0%BA%D0%BE%D0%B2.jpg/1280px-%D0%98%D0%B7%D0%B2%D0%B0%D1%8F%D0%BD%D0%BE_%D0%BE%D1%82_%D0%BF%D1%80%D0%B8%D1%80%D0%BE%D0%B4%D0%B0%D1%82%D0%B0-%D0%BD%D0%B0%D0%B4_%D0%9C%D0%B5%D0%BB%D0%BD%D0%B8%D0%BA-%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F-%D0%A1%D1%82%D0%BE%D1%8F%D0%BD_%D0%9F%D0%B5%D1%82%D0%BA%D0%BE%D0%B2.jpg",
    },
  ];
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllPosts().then((data) => {
      setPosts(data);
      setIsLoading(false);
      console.log(data);
    });
  }, []);

  return (
    <div className="container">
      <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div key={post.id} className=" flex flex-col justify-between rounded-xl border border-slate-600">
            <div className="w-[320px] h-[350px]">
              <img src={post.imageUrls[0]} alt="vihren" className="w-full h-[200px] object-cover rounded-t-xl hover:cursor-pointer hover:shadow-2xl hover:shadow-blue-300" />
              <div className=" text-center">
                <h1 className="text-2xl font-semibold text-gray-800">{post.title}</h1>
                <p className="text-xl font-sans truncate">{post.userId}</p>
                <Link to="/tripDetails">
                  <button className=" mt-5 p-2 rounded-full px-6 shadow shaodw-2xl shadow-black hover:shadow-blue-400 hover:scale-[1.25] transition duration-300">Learn more...</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
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
