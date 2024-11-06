import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedList: JSON.parse(localStorage.getItem("liked")) || [],
};

export const LikedSlice = createSlice({
  name: "liked",
  initialState: initialState,
  reducers: {
    addLiked(state, action) {
      const likedSong = action.payload;
      const likedSongExists = state.likedList.find(
        (music) => music.id === likedSong.id
      );

      const newLikedList = likedSongExists
        ? state.likedList.filter((music) => music.id !== likedSong.id)
        : [...state.likedList, likedSong];

      localStorage.setItem("liked", JSON.stringify(newLikedList));

      return {
        ...state,
        likedList: newLikedList,
      };
    },
  },
});

export const { addLiked } = LikedSlice.actions;

export default LikedSlice.reducer;
