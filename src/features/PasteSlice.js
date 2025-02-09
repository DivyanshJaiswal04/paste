import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  paste: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};


export const PasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.paste.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.paste));
      toast.success("Paste created successfully");
    },
    updateToPaste: (state, action) => {
      const paste = action.payload;
      const index = state.paste.findIndex((p) => p.id === paste.id);

      if (index >= 0) {
        state.paste[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.paste));
        toast.success("Paste updated successfully");
      } else {
        toast.error("Paste not found");
      }
    },
    resetAllPaste: (state, action) => {
      state.paste = [];
      localStorage.removeItem("pastes");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      const index = state.paste.findIndex((p) => p.id === pasteId);

      if (index >= 0) {
        // state.paste.splice(index, 1);
        state.paste = state.paste.filter((p) => p.id !== pasteId);
        localStorage.setItem("pastes", JSON.stringify(state.paste));
        toast.success("Paste deleted successfully");
      } else {
        toast.error("Paste not found");
      }
    },
  },
});

export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  PasteSlice.actions;
