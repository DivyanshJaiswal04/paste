import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.paste);

  if (!id) {
    toast.error("Invalid paste ID");
    return null;
  }

  const paste = pastes?.find((p) => p.id === id);

  if (!paste) {
    toast.error("Paste not found");
    return (
      <div className="bg-zinc-800 min-h-screen flex justify-center items-center py-10">
        <div className="text-white text-lg">Paste not found</div>
      </div>
    );
  }

  // Function to copy content to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.value);
    toast.success("Content copied to clipboard!");
  };

  return (
    <div className="bg-zinc-800 min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-4xl bg-zinc-900 shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-zinc-700 p-8 border-b border-zinc-600 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{paste.title}</h1>
            <p className="text-gray-400 text-sm mt-2">
              Created on: <span>{paste.date}</span>
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center bg-zinc-800 text-gray-300 hover:bg-zinc-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
            title="Copy content"
          >
            <span>Copy</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          <div className="bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-600">
            <pre className="text-gray-300 whitespace-pre-wrap break-words">
              {paste.value}
            </pre>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-zinc-700 p-4 border-t border-zinc-600 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Your App Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
