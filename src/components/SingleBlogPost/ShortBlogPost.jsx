import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { UserAuth } from "../context/AuthContext";

import { collection, onSnapshot, query, where } from "firebase/firestore";

const SingleBlogPost = ({ setPostsLength, setPostUsername }) => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    if (user.uid) {
      const q = query(collection(db, "blogs"), where("userId", "==", id));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setIsLoading(true);
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
        setPostsLength(newPosts.length);
        setPostUsername(newPosts[0].userName);
        setIsLoading(false);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user.uid]);


  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-4xl font-bold">Loading posts...</p>
        </div>
      ) : (
        <>
          {posts?.map((post) => (
            <div className="bg-blue-200 m-5" key={post.id}>
              <div className="bg-gray-500 flex min-w-screen">
                {/* image */}
                <div className=" rounded-xl bg-green-300 m-5 w-1/2 overflow-hidden">
                  <img src={post.imageUrls} alt="Blog post" className="w-full h-full object-cover" />
                </div>
                {/* Description */}
                <div className="mx-5 flex flex-col w-1/2">
                  <Link to={`/fullBlogPost/${post.id}`} className="text-3xl font-semibold pb-2 border-b text-center hover:cursor-pointer hover:text-blue-900">
                    {post.title}
                  </Link>
                  <p className="text-xl pt-2">Created by:</p>
                  <h1 className="text-blue-200 text-2xl font-semibold">{post.userName}</h1>
                  <span>{post.category}</span>
                  <p className="text-gray-800 pt-2">Description:</p>
                  <p className="truncate text-xl">{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default SingleBlogPost;
