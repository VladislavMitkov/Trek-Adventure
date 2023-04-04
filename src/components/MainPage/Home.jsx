import ImageCards from "./ImageCards";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="prose  text-xl sm:text-2xl md:text-3xl lg:text-4xl text-slate-800 p-5 border-b shadow-xl rounded-full shadow-blue-100">
          The place where you can find, share <hr className="border-none" /> and admire the beautiful destinations of our world!
        </h1>
        <h3 className="prose text-xl text-slate-600 mt-4 mb-3">This are the latest places from our users:</h3>
      </div>
      <div>
        <ImageCards />
      </div>
    </div>
  );
};

export default Home;
