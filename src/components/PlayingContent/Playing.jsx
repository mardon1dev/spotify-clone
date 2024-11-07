import React, { useContext } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { Context } from "../../context/Context";

const Playing = () => {
  const {
    accessToken,
    play,
    playing,
    setPlaying,
    setCurrentPlaying,
  } = useContext(Context);
  return (
    <div className="fixed bottom-0 w-full">
      <SpotifyWebPlayer
        token={accessToken}
        uris={play ? [play] : []}
        play={playing}
        callback={(state) => {
          if (state.isPlaying) {
            setPlaying(true)
            setCurrentPlaying(true)
          }
          else{
            setPlaying(false)
            setCurrentPlaying(false)
          }
        }}
        styles={{
          activeColor: "#1DB954",
          bgColor: "#181818",
          color: "#fff",
          loaderColor: "#fff",
          sliderColor: "#1DB954",
          trackArtistColor: "#ccc",
          trackNameColor: "#fff",
        }}
      />
    </div>
  );
};

export default Playing;
