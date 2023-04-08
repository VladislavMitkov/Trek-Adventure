import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogPostById, updateBlogPost } from "../../firebase/postsApi";
import { validateEditBlogPost } from "./EditBlogPostValidation";

const EditBlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const date = new Date();
  const [newCategory, setNewCategory] = useState("Mountain");
  const [newTitlte, setnewTitlte] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getBlogPostById(id, setBlog);
  }, [id]);

  useEffect(() => {
    setnewTitlte(blog?.title || "");
    setNewCategory(blog?.category || "");
    setNewDescription(blog?.description || "");
  }, [blog]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateEditBlogPost(newTitlte, newDescription, setError);
    if (!isValid) {
      return;
    }
    try {
      updateBlogPost(id, {
        title: newTitlte,
        description: newDescription,
        date: date.toLocaleString(),
        category: newCategory,
      }).then(() => {
        navigate(-1);
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen">
      <form action="#" onSubmit={handleUpdateSubmit} className="flex justify-center mt-10">
        <div className="flex w-8/12 justify-center bg-slate-50 rounded-xl shadow-xl">
          <div className=" flex flex-col items-center ">
            <header className="flex flex-col justify-center items-center mt-5 border-b-2 border-slate-500 mx-2">
              <h2 className="text-3xl md:text-5xl  text-gray-800 font-sans font-semibold">Update your post</h2>
              <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">
                <img src={blog?.imageUrls} alt="" className="w-32" />
              </p>
            </header>
            <div className="flex justify-center items-center mt-5 gap-3 p-2 w-8/12">
              <label htmlFor="title" className="font-sans text-gray-800">
                Title:
              </label>
              <input
                type="text"
                name="title"
                placeholder={blog?.title}
                className="rounded-xl p-2 outline-none focus:shadow-lg shadow"
                value={newTitlte}
                onChange={(e) => setnewTitlte(e.target.value)}
              />
            </div>
            {error && <p className="text-red-700 font-light">The title must be longer than 3 symbols.</p>}
            <div className="flex gap-1">
              <div className="flex justify-between items-center mt-5 gap-3 p-2 w-8/12 rounded-xl">
                <label htmlFor="category" className="font-sans text-gray-800">
                  Category:
                </label>
                <select
                  name="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="rounded-xl p-2 px-5 outline-none focus:shadow-lg bg-teal-600 text-white hover:bg-teal-300 transition-all ease-in-out duration-300"
                >
                  <option value="mountain">Mountain</option>
                  <option value="city">City</option>
                  <option value="landmark">Landmark</option>
                  <option value="hikingTrail">Hiking Trail</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 p-2 w-10/12">
              <label htmlFor="description" className="font-sans text-gray-800">
                Description:
              </label>
              <textarea
                type="text"
                name="description"
                placeholder={blog?.description}
                rows="3"
                cols="50"
                wrap="hard"
                className="rounded-xl p-2 outline-none focus:shadow-lg shadow ml-2"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            {error && <p className="text-red-700 font-light">The title must be longer than 20 symbols.</p>}

            <footer className="flex gap-3">
              <button type="submit" className="text-white bg-teal-600 p-3 text-lg rounded-xl my-2 hover:bg-teal-300 transition-all ease-in-out duration-300">
                Update
              </button>
              <button onClick={handleCancel} type="button" className="text-white bg-teal-600 p-3 text-lg rounded-xl my-2 hover:bg-teal-300 transition-all ease-in-out duration-300">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPost;
