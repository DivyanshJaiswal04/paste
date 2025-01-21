import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste, resetAllPaste } from "../features/PasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.paste);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const filterData = Array.isArray(pastes)
      ? setFilterData(
          pastes.filter(
            (paste) =>
              paste.title &&
              paste.title.toLowerCase().includes(search.toLowerCase())
          )
        )
      : setFilterData([]);
  }, [search, pastes]);

  const handleDelete = (id) => {
    dispatch(removeFromPaste(id));
  };

  const handleShare = async (paste) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.value,
          url: window.location.href,
        });
        toast.success("Paste shared successfully");
      } catch (error) {
        toast.error("Sharing failed");
      }
    } else {
      toast.error("Web Share API is not supported in your browser");
    }
  };

  return (
    <div className="bg-zinc-800 min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-4xl bg-zinc-900 shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-zinc-800 p-6 flex items-center gap-4">
          <input
            type="text"
            className="flex-grow p-5 bg-zinc-700 text-white rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
            placeholder="Search for paste"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => {
              dispatch(resetAllPaste());
            }}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Reset
          </button>
        </div>
        <div className="p-6">
          {filterData.length === 0 ? (
            <div className="text-center text-gray-500 text-lg font-medium">
              No pastes found
            </div>
          ) : (
            filterData.map((paste, index) => (
              <div
                key={index}
                className="mb-6 bg-zinc-800 shadow-lg rounded-2xl p-6 border border-zinc-600 hover:border-indigo-500 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-semibold text-white">
                    {paste.title}
                  </div>
                  <div className="text-gray-400 text-sm ml-auto">
                    {paste.date}
                  </div>
                </div>
                <div className="mt-2 text-gray-300">{paste.value}</div>
                <div className="mt-4 flex justify-between gap-6">
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    <a href={`/?id=${paste.id}`}>Edit</a>
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    <a href={`/ViewPaste/${paste.id}`}>View</a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste.id)}
                    className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.value);
                      toast.success("Copied to clipboard");
                    }}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleShare(paste)}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Share
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
