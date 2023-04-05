import React from "react";

const ErrorModal = ({ message, title, onConfirm }) => {
  return (
    <>
      <div className="absolute bg-gray-800 bg-opacity-50 overflow-auto flex justify-center items-center inset-0">
        <div className="w-[400px] h-[200px] bg-gray-300 flex flex-col justify-between space-y-4 rounded">
          <div className=" py-1 px-2 border  border-slate-700 w-full bg-gray-800 drop-shadow-2xl rounded">
            <header className="flex justify-center">
              <h2 className="text-lg font-bold text-white">{title}</h2>
            </header>
          </div>
          <div className="mt-2 py-1 px-2 border-t-black h-[300px] items-center flex justify-center">
            <p className="text-md text-zinc-700">{message}</p>
          </div>
          <div className="flex justify-center">
            <footer className="mt-3 px-3 py-1 bg-blue-700 text-white font-bold justify-center mb-2 rounded w-full mr-1 ml-1">
              <button onClick={onConfirm} className="w-full">
                Okay
              </button>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
