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
    setnewTitlte(blog?.title);
    setNewCategory(blog?.category);
    setNewDescription(blog?.description);
  }, [id, blog?.title]);

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

  return (
    <div className="h-screen">
      <form action="#" onSubmit={handleUpdateSubmit} className="flex justify-center mt-10">
        <div className="flex w-8/12 justify-center bg-slate-300 rounded-xl shadow-xl shadow-blue-100">
          <div className=" flex flex-col items-center ">
            <header className="flex flex-col justify-center items-center mt-5 border-b-2 border-slate-500 mx-2">
              <h2 className="text-3xl md:text-5xl  text-gray-800 font-sans font-semibold">Update your post</h2>
              <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">
                <img src={blog?.imageUrls} alt="" className="w-32" />
              </p>
            </header>
            <div className="flex justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-8/12 rounded-xl shadow-lg border-slate-500">
              <label htmlFor="title" className="font-sans text-gray-800">
                Title:
              </label>
              <input
                type="text"
                name="title"
                placeholder={blog?.title}
                className="rounded-xl p-2 outline-none focus:shadow-blue-500 focus:shadow-lg"
                value={newTitlte}
                onChange={(e) => setnewTitlte(e.target.value)}
              />
            </div>
            {error && <p className="text-red-700 font-light">The title must be longer than 3 symbols.</p>}
            <div className="flex gap-1">
              {/* <div className="flex justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-8/12 rounded-xl shadow-lg border-slate-500">
                <label htmlFor="date" className="font-sans text-gray-800">
                  Date:
                </label>
                <input type="date" name="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="rounded-xl p-2 outline-none focus:shadow-blue-500 focus:shadow-lg" />
              </div> */}
              <div className="flex justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-8/12 rounded-xl shadow-lg border-slate-500">
                <label htmlFor="category" className="font-sans text-gray-800">
                  Category:
                </label>
                <select name="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="rounded-xl p-2 px-5 outline-none focus:shadow-blue-500 focus:shadow-lg">
                  <option value="mountain">Mountain</option>
                  <option value="city">City</option>
                  <option value="landmark">Landmark</option>
                  <option value="hikingTrail">Hiking Trail</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-11/12 rounded-xl shadow-lg border-slate-500">
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
                className="rounded-xl outline-none focus:shadow-blue-500 focus:shadow-lg"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            {error && <p className="text-red-700 font-light">The title must be longer than 20 symbols.</p>}

            <footer className="flex gap-3">
              <button
                type="submit"
                className="flex justify-center items-center mt-5 mb-5 rounded-xl border border-r-2 p-2 shadow-lg border-blue-200  hover:scale-[1.5] transition duration-300 ease-in-out hover:shadow-blue-600"
              >
                Update
              </button>
              <button
                type="submit"
                className="flex justify-center items-center mt-5 mb-5 rounded-xl border border-r-2 p-2 shadow-lg border-blue-200  hover:scale-[1.5] transition duration-300 ease-in-out hover:shadow-blue-600"
              >
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
