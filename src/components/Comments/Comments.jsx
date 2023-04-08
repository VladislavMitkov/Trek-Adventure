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
        <div>
          <p>Loading comments...</p>
        </div>
      ) : (
        <section className="m-10  rounded-xl shadow-2xl shadow-amber-700">
          {comments.map((com) => (
            <div key={com.id} className="flex justify-between rounded-b-xl p-3 shadow-md shadow-amber-100">
              <div>
                <p>{com.content}</p>
                <p>{com.username}</p>
                <p>{com.currentTime}</p>
              </div>
              {user?.email === com.userEmail && <button onClick={() => handleDeleteClick(com?.id)}>delete</button>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Comments;
