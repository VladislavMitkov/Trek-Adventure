import React, { useState } from "react";
import { addComment } from "../../firebase/CommentsApi";
import { useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const AddComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  const { user } = UserAuth();

  const onCommentSubmit = (e) => {
    e.preventDefault();
    addComment({
      content: comment,
      currentTime: currentTime.toLocaleTimeString(),
      username: user?.displayName,
      blogId: id,
    });
    setComment("");
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
      <section></section>
    </div>
  );
};

export default AddComment;
