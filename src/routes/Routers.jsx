import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Dashboard/Home";
import {
  Category,
  Library,
  LikedSongs,
  Playlist,
  Search,
  SinglePage,
} from "../pages/Dashboard";

const Routers = () => {
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/liked-songs" element={<LikedSongs />} />
        <Route path="/music/:id" element={<SinglePage />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </div>
  );
};

export default Routers;
