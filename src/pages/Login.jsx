import React from "react";
import { CLIENT_ID } from "../hook/useEnv";

const Login = () => {
  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played`;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#000]/70">
      <div>
        <div className="w-[400px] flex flex-col items-center text-center">
          <h1 className="text-white font-bold text-[24px]">
            Welcome to Spotify website. Enjoy free music
          </h1>
          <a
            className="bg-green-500 p-2 w-[150px] rounded text-white mt-10 active:bg-green-700 hover:bg-green-400"
            href={AUTH_URL}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
