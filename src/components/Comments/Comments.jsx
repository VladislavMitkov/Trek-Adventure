import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { DeleteComment } from "../../firebase/CommentsApi";
import { UserAuth } from "../context/AuthContext";

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = UserAuth();

  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, "comments"), where("blogId", "==", id));
    const unsub = onSnapshot(q, (snapshot) => {
      const newComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(newComments);
      setIsLoading(false);
    });
    return () => {
      unsub();
    };
  }, [id]);

  const handleDeleteClick = (id) => {
    DeleteComment(id);
  };

  return (
    <div>
      {isLoading ? (
        <div className="text-gray-800 font-semibold text-xl">
          <p>Loading comments...</p>
        </div>
      ) : (
        <section className="m-10  rounded-xl shadow shadow-teal-600">
          {comments.map((com) => (
            <div key={com.id} className="flex justify-between rounded-b-xl p-2 shadow-md shadow-teal-600">
              <div className="flex flex-col justify-center w-full">
                <p className="text-lg font-semibold pl-5 line-clamp-5 border-b">{com.content}</p>
                <div className="flex justify-start items-center">
                  <p className="text-gray-800 font-normal mx-2">{com.username}</p>
                  <p className="text-gray-800 font-normal">{com.currentTime}</p>
                </div>
              </div>
              {user?.email === com.userEmail && (
                <button onClick={() => handleDeleteClick(com?.id)} className="text-white bg-red-700 rounded-xl p-2 m-2">
                  delete
                </button>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Comments;
