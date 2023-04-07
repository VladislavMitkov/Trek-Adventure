import React, { useState } from "react";
import { addComment } from "../../firebase/CommentsApi";
import { useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Comments from "./Comments";

const AddComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const time = new Date();
  const [error, setError] = useState("false");

  const { user } = UserAuth();

  const onCommentSubmit = (e) => {
    e.preventDefault();
    try {
      addComment({
        content: comment,
        currentTime: time.toLocaleTimeString(),
        username: user?.displayName,
        blogId: id,
      });
      setComment("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form action="" onSubmit={onCommentSubmit} className="flex flex-col justify-center text-center items-center">
        <label>Add a comment</label>
        <textarea className="w-[50%]" type="text" placeholder="What do you think about this place..." value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit" className="border p-3 rounded-xl mt-5 shadow-xl bg-blue-600 text-white border-blue-900">
          Send
        </button>
      </form>
      <section>
        <Comments />
      </section>
    </div>
  );
};

export default AddComment;
