import React, { useState } from "react";
import { addComment } from "../../firebase/CommentsApi";
import { useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Comments from "./Comments";

const AddComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const time = new Date();
  const [error, setError] = useState(false);

  const { user } = UserAuth();

  const onCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() < 1) {
      setError(true);
      return;
    }
    try {
      addComment({
        content: comment,
        currentTime: time.toLocaleTimeString(),
        username: user?.displayName,
        userId: user?.uid,
        userEmail: user?.email,
        blogId: id,
      });
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
    setError(false);
  };

  return (
    <div>
      <form action="" onSubmit={onCommentSubmit} className="flex flex-col justify-center text-center items-center">
        <label className="text-lg font-semibold">Add a comment</label>
        <textarea className="w-[50%] outline-none focus:shadow-lg shadow rounded-xl p-3" type="text" placeholder="What do you think about this place..." value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit" className="text-white bg-teal-600 p-1 px-3 rounded-xl text-xl hover:bg-teal-300 transition-all ease-in-out duration-300 mt-2">
          Send
        </button>
      </form>
      {error && (
        <div className="flex justify-center mt-2 text-red-700 font-semibold">
          <p>Comments can't be empty.</p>
        </div>
      )}
      <section>
        <Comments />
      </section>
    </div>
  );
};

export default AddComment;
