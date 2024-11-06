import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Routers from "../routes/routers";
import Aside from "../components/Aside/Aside";
import useAuth from "../hook/useAuth";
import { BackIcon, FrontIcon } from "../assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Playing from "../components/PlayingContent/Playing";

const Layout = ({ code }) => {
  const navigate = useNavigate();
  const [background, setBackground] = useState(null);
  const location = useLocation();

  const changeDirectionBackground = [
    { background: "#3333A3", name: "" },
    { background: "#604E11", name: "search" },
    { background: "#f7f7f7", name: "playlist" },
    { background: "#604EC1", name: "liked-songs" },
    { background: "#104311", name: "library" },
    { background: "#DDF628", name: "music" },
  ];

  useEffect(() => {
    const bg = changeDirectionBackground.find(
      (item) => item.name === location.pathname.split("/")[1]
    );
    setBackground(bg?.background);
  }, [location]);

  useAuth(code);

  return (
    <div className="w-full flex items-start justify-between">
      <Navbar />
      <div className="w-full relative">
        <div
          className="w-full sticky top-0 left-0 right-0 px-[40px] py-5 space-x-[22px] z-20"
          style={{ backgroundColor: background }}
        >
          <button onClick={() => navigate(-1)}>
            <FrontIcon />
          </button>
          <button onClick={() => navigate(+1)}>
            <BackIcon />
          </button>
        </div>
        <Routers />
      </div>
      <Aside />
      <Playing />
    </div>
  );
};

export default Layout;
