import { createContext, useState } from "react";

export const Context = createContext();

export const ContextWrapper = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  // localStorage.setItem("accessToken", accessToken);
  const [play, setPlay] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(false);
  const [currentPlayingMusic, setCurrentPlayingMusic] = useState({});
  return (
    <Context.Provider
      value={{
        accessToken,
        setAccessToken,
        play,
        playing,
        setPlay,
        setPlaying,
        currentPlaying,
        setCurrentPlaying,
        currentPlayingMusic,
        setCurrentPlayingMusic,
      }}
    >
      {children}
    </Context.Provider>
  );
};
