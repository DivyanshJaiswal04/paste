import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addToPaste, updateToPaste } from "../features/PasteSlice";
import { toast } from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const pasteId = searchParam.get("pasteId");
  const dispatch = useDispatch();

  // date
  const now = new Date();
  const date = now.toLocaleDateString(); // e.g., "1/15/2025"
  const time = now.toLocaleTimeString(); // e.g., "10:34:23 AM"
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const current = date + " " + time + " " + day;

  const createPaste = () => {
    const Paste = {
      id: pasteId || nanoid().toString(),
      title,
      value,
      date: current,
    };

    if (pasteId) {
      dispatch(updateToPaste(Paste));
    } else {
      if (title.trim() === "" || value.trim() === "") {
        toast.error("Please enter both title and value.");
        return;
      }
      dispatch(addToPaste(Paste));
    }
    setTitle("");
    setValue("");
    setSearchParam({});
  };

  return (
    <div className="bg-zinc-800 min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-zinc-900 shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          {pasteId ? "Update Paste" : "Create New Paste"}
        </h1>

        <div className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full bg-zinc-800 text-white rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 shadow-sm"
              placeholder="Enter title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-2"
              htmlFor="paste"
            >
              Paste Content
            </label>
            <textarea
              id="paste"
              className="w-full bg-zinc-800 text-white rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 shadow-sm h-40 resize-none"
              placeholder="Enter your paste here"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <button
            onClick={createPaste}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
