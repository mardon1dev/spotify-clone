import React, { useContext } from "react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { Context } from "../../context/Context";

const Playing = () => {
  const { accessToken, play, playing, setPlaying } = useContext(Context);
  return (
    <div className="fixed bottom-0 w-full">
      <SpotifyWebPlayer
        token={accessToken}
        uris={play ? [play] : []}
        play={playing}
        callback={(e) => {
          if (e.isPlaying) {
            setPlaying(false);
          }
        }}
      />
    </div>
  );
};

export default Playing;
