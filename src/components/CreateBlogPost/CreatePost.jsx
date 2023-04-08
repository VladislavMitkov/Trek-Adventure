import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onSubmitBlogPost } from "../../firebase/postsApi";
import { validateCreateBlogPost } from "./CreateBlogPostValidation";
import { UserAuth } from "../context/AuthContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const date = new Date();
  const [category, setCategory] = useState("mountain");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const { user } = UserAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = validateCreateBlogPost(title, description, setError);
    if (!isValid) {
      return;
    }
    try {
      onSubmitBlogPost({
        title,
        date: date.toLocaleString(),
        category,
        description,
        image,
      }).then(() => {
        navigate(`/profile/${user.uid}`);
      });
    } catch (error) {}
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen">
      <form action="#" className="flex justify-center mt-10" onSubmit={onSubmit}>
        <div className="flex w-8/12 justify-center bg-slate-50 rounded-xl shadow-xl">
          <div className=" flex flex-col items-center">
            <header className="flex flex-col justify-center items-center mt-5 border-b-2 border-slate-500 mx-2">
              <h2 className="text-3xl md:text-5xl  text-gray-800 font-sans font-semibold">Create New Post</h2>
              <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">Tell everyone about your adventure... </p>
            </header>
            <div className="flex justify-center items-center mt-5 gap-3 p-2 w-8/12">
              <label htmlFor="title" className="font-sans text-gray-800">
                Title:
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="The name of the place..."
                className="rounded-xl p-2 outline-none focus:shadow-lg shadow"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                  className="rounded-xl p-2 px-5 outline-none focus:shadow-lg bg-teal-600 text-white hover:bg-teal-300 transition-all ease-in-out duration-300"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                required
                placeholder="Describe the adventure..."
                rows="3"
                cols="50"
                wrap="hard"
                className="rounded-xl p-2 outline-none focus:shadow-lg shadow ml-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {error && <p className="text-red-700 font-light text-center">The title must be longer than 20 symbols.</p>}
            <div className="flex justify-center items-center mt-5 p-2 w-11/12">
              <label htmlFor="image" className="font-sans text-gray-800">
                Upload image
              </label>
              <input type="file" name="image" required className="rounded-xl p-2 outline-none shadow focus:shadow-lg bg-white" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <footer className="flex gap-3">
              <button type="submit" className="text-white bg-teal-600 p-3 text-lg rounded-xl my-2 hover:bg-teal-300 transition-all ease-in-out duration-300">
                Create
              </button>
              <button onClick={handleCancel} className="text-white bg-teal-600 p-3 text-lg rounded-xl my-2 hover:bg-teal-300 transition-all ease-in-out duration-300">
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
