import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { DeleteBlogPost } from "../../firebase/postsApi";

const FullBlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "blogs", id);
    const unsubDoc = onSnapshot(docRef, (doc) => {
      setBlog(doc.data());
    });
  }, [id]);

  // handle delete
  const handleDeleteClick = () => {
    DeleteBlogPost(id);
    navigate(-1);
  };

  return (
    <>
      {deleteModal && (
        <div>
          <div className="relative rounded-lg shadow ">
            <h1>Are you sure you want to delete this post?</h1>
          </div>
          <button onClick={handleDeleteClick} className="shadow-xl p-5 shadow-gray-500 rounded-xl m-2 hover:bg-red-500">
            Delete
          </button>
          <button onClick={() => setDeleteModal(false)} className="shadow-xl p-5 shadow-gray-500 rounded-xl m-2 hover:bg-green-500">
            Cancel
          </button>
        </div>
      )}
      <div>
        <main>
          <div className="flex justify-center">
            <img src={blog?.imageUrls} className="w-66 h-80 m-auto" alt="" />
            <div className="flex flex-col">
              <Link to={`/editBlogPost/${id}`} className="shadow-xl shadow-gray-500 rounded-xl mr-3 mt-3 hover:bg-green-200 p-5 flex justify-center items-center">EDIT</Link>
              <button onClick={() => setDeleteModal(true)} className="shadow-xl shadow-gray-500 rounded-xl mr-3 mt-5 hover:bg-red-300 p-5 flex justify-center items-center">
                DELETE
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1>{blog?.title}</h1>
            <h2>{blog?.userName}</h2>
            <h3>{blog?.category}</h3>
            <p>{blog?.date}</p>
            <p>{blog?.description}</p>
          </div>
        </main>
        {/* COMMENT SECTION */}
        <form action="" className="flex flex-col justify-center text-center items-center">
          <label>Add a comment</label>
          <textarea className="w-[50%]" type="text" placeholder="What do you think about this place..." />
        </form>
        <section>
          <p>comments...</p>
        </section>
      </div>
    </>
  );
};

export default FullBlogPost;
