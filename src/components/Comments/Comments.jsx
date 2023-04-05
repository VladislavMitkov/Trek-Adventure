import React, { useEffect, useState } from "react";
import { getAllComments, getComments } from "../../firebase/CommentsApi";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Comments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "comments"), where("blogId", "==", id));
    const unsub = onSnapshot(q, (snapshot) => {
      setIsLoading(true);
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

  return (
    <div>
      {comments.map((com) => (
        <div key={com.id}>
          <p>{com.content}</p>
          <p>{com.username}</p>
          <p>{com.currentTime}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
