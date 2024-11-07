import React, { useState } from "react";
import { useSelector } from "react-redux";
import MusicTableRow from "../../components/MusicTableRow";

const LikedSongs = () => {
  const liked = useSelector((state) => state.liked.likedList);
  const [likedSongs, setLikedSongs] = useState(liked);

  const [filterTerm, setFilterTerm] = useState("")

  const filteredTracks = liked.filter(
    (track) =>
      track.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      track.artistName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <div className="w-full liked-page min-h-screen">
      <div className="px-[40px] pt-[20px]">
        <div>
          <h1 className="text-[50px] text-white">Liked Songs</h1>
        </div>
        <div className="related-tracks">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#000]/10 rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-left text-white">#</th>
                  <th className="px-4 py-2 text-left text-white">Image</th>
                  <th className="px-4 py-2 text-left text-white">Track Name</th>
                  <th className="px-4 py-2 text-left text-white">Artist</th>
                  <th className="px-4 py-2 text-left text-white">Preview</th>
                  <th className="px-4 py-2 text-left text-white">Like</th>
                </tr>
              </thead>
              <tbody>
                {filteredTracks.length > 0 ? (
                  filteredTracks.map((track, index) => (
                    <MusicTableRow
                      track={track}
                      index={index}
                      key={track.id}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-white py-4">
                      No tracks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
