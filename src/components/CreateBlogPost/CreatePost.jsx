import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onSubmitBlogPost } from "../../firebase/postsApi";
import { UserAuth } from "../context/AuthContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const date = new Date();
  const [category, setCategory] = useState("mountain");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const { user } = UserAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitBlogPost({
      title,
      date: date.toLocaleString(),
      category,
      description,
      image,
    });
    navigate(`/profile/${user.uid}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen">
      <form action="#" className="flex justify-center mt-10" onSubmit={onSubmit}>
        <div className="flex w-8/12 justify-center bg-slate-300 rounded-xl shadow-xl shadow-blue-100">
          <div className=" flex flex-col items-center ">
            <header className="flex flex-col justify-center items-center mt-5 border-b-2 border-slate-500 mx-2">
              <h2 className="text-3xl md:text-5xl  text-gray-800 font-sans font-semibold">Create New Post</h2>
              <p className="text-gray-600 md:text-3xl my-2 text-center font-sans">Tell everyone about your adventure... </p>
            </header>
            <div className="flex justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-8/12 rounded-xl shadow-lg border-slate-500">
              <label htmlFor="title" className="font-sans text-gray-800">
                Title:
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="The name of the place..."
                className="rounded-xl p-2 outline-none focus:shadow-blue-500 focus:shadow-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex gap-1">
              {/* <div className="flex justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-8/12 rounded-xl shadow-lg border-slate-500">
                <label htmlFor="date" className="font-sans text-gray-800">
                  Date:
                </label>
                <input type="date" name="date" className="rounded-xl p-2 outline-none focus:shadow-blue-500 focus:shadow-lg" value={date} onChange={(e) => setDate(e.target.value)} />
              </div> */}
              <div className="flex justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-8/12 rounded-xl shadow-lg border-slate-500">
                <label htmlFor="category" className="font-sans text-gray-800">
                  Category:
                </label>
                <select name="category" className="rounded-xl p-2 px-5 outline-none focus:shadow-blue-500 focus:shadow-lg" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="mountain">Mountain</option>
                  <option value="city">City</option>
                  <option value="landmark">Landmark</option>
                  <option value="hikingTrail">Hiking Trail</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-10/12 rounded-xl shadow-lg border-slate-500">
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
                className="rounded-xl p-2 outline-none focus:shadow-blue-500 focus:shadow-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mt-5 gap-3 border border-r-2 p-2 w-8/12 rounded-xl shadow-lg border-slate-500">
              <label htmlFor="images" className="font-sans text-gray-800">
                Upload images
              </label>
              <input type="file" name="images" required className="rounded-xl p-2 outline-none focus:shadow-blue-500 focus:shadow-lg" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <footer className="flex gap-3">
              <button
                type="submit"
                className="flex justify-center items-center mt-5 mb-5 rounded-xl border border-r-2 p-2 shadow-lg border-blue-200  hover:scale-[1.5] transition duration-300 ease-in-out hover:shadow-blue-600"
              >
                Create
              </button>
              <button
                onClick={handleCancel}
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

export default CreatePost;
