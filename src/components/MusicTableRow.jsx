import React, { useContext, useEffect } from "react";
import { addLiked } from "../store/LikedSlice";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../context/Context";
import { CurrentPlayingActiveIcon, CurrentPlayingIcon, LikeIcon } from "../assets/icons";
import CurrentPlaying from "./CurrentPlaying/CurrentPlaying";

const MusicTableRow = ({ track, index }) => {
  const liked = useSelector((state) => state.liked.likedList);
  const dispatch = useDispatch();

  const {
    setPlay,
    setPlaying,
    currentPlaying,
    setCurrentPlaying,
    currentPlayingMusic,
    setCurrentPlayingMusic,
  } = useContext(Context);

  function handlePlay(track, evt) {
    if (evt.target.id == "liked") {
      dispatch(addLiked(track));
    } else {
      setPlay(track.uri);
      setPlaying(true);
      setCurrentPlayingMusic(track);
    }
  }
  useEffect(() => {
    if (currentPlayingMusic.id === track.id) {
      setCurrentPlayingMusic(track);
      setCurrentPlaying(!currentPlaying);
    }
  }, [currentPlayingMusic, track]);


  const isPlaying = track.id == currentPlayingMusic.id;
  const isLiked = liked.some((likedTrack) => likedTrack.id === track.id);
  return (
    <tr
      className="border-b border-[#333] cursor-pointer"
      onClick={(evt) => handlePlay(track, evt)}
    >
      <td className="px-4 py-2 text-left text-white">
        <div className={`flex items-center justify-center ${currentPlaying ? "w-full" : "w-[26px] h-[30px]"} `}>
          {isPlaying ? (
            currentPlaying ? (
              <CurrentPlaying />
            ) : (
              <div className="!scale-[.5]">
                <CurrentPlayingIcon />
              </div>
            )
          ) : (
            index + 1
          )}
        </div>
      </td>
      <td className="px-4 py-2">
        <img
          className="h-[60px] w-[60px] rounded"
          src={track.image}
          alt={track.name}
        />
      </td>
      <td
        className={`px-4 py-2 ${
          track.isPlaying ? "text-green-500" : "text-white"
        }`}
      >
        {track.name}
      </td>
      <td className="px-4 py-2 text-[#fff]/70">{track.artistName}</td>
      <td className="px-4 py-2">
        {track.preview_url ? (
          <audio controls src={track.preview_url}>
            Your browser does not support the audio element.
          </audio>
        ) : (
          <span className="text-[#fff]/50">No preview available</span>
        )}
      </td>
      <td>
        <button
          id="liked"
          className={`${
            isLiked ? "text-green-500" : "text-white"
          } flex items-center justify-center w-full`}
        >
          <LikeIcon />
        </button>
      </td>
    </tr>
  );
};

export default MusicTableRow;
