import { createContext, useState } from "react";

export const Context = createContext();

export const ContextWrapper = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [play, setPlay] = useState(null)
  const [playing, setPlaying] = useState(false)
  return (
    <Context.Provider value={{ accessToken, setAccessToken, play, playing, setPlay, setPlaying }}>
      {children}
    </Context.Provider>
  );
};
