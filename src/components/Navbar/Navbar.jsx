import React, { useState } from "react";
import {
  HomeActiveIcon,
  HomeIcon,
  LibraryActiveIcon,
  LibraryIcon,
  LikedSongsIcon,
  PlaylistIcon,
  SearchActiveIcon,
  SearchIcon,
} from "../../assets/icons";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [navbarList, setNavbarList] = useState([
    {
      id: 1,
      name: "Home",
      link: "/",
      iconFirst: <HomeIcon />,
      iconSecond: <HomeActiveIcon />,
      iconShow: false,
    },
    {
      id: 2,
      name: "Search",
      link: "/search",
      iconFirst: <SearchIcon />,
      iconSecond: <SearchActiveIcon />,
      iconShow: false,
    },
    {
      id: 3,
      name: "Your Library",
      link: "/library",
      iconFirst: <LibraryIcon />,
      iconSecond: <LibraryActiveIcon />,
      iconShow: false,
    },
  ]);

  function handleActiveIcon(id) {
    setNavbarList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, iconShow: !item.iconShow }
          : { ...item, iconShow: false }
      )
    );
    setActiveLink(id);
  }

  function handleSidebarLink(linkId) {
    setActiveLink(linkId);
  }

  return (
    <div className="w-[25%] bg-black text-white h-screen sticky top-0 ">
      <ul className="flex items-start justify-center flex-col mt-[70px] gap-5 px-[30px]">
        {navbarList.map((item) => (
          <li className="" key={item.id}>
            <NavLink
              to={item.link}
              onClick={() => handleActiveIcon(item.id)}
              className={`w-full flex items-center gap-5 ${
                activeLink === item.id ? "text-[#fff]" : "text-[#fff]/70"
              }`}
            >
              {item.iconShow ? item.iconSecond : item.iconFirst}
              <span className="text-[18px]">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-start justify-center flex-col mt-[50px] px-[30px] gap-5">
        <Link
          id="playlist"
          to={"/playlist"}
          onClick={() => handleSidebarLink("playlist")}
          className={`w-full flex items-center gap-5 ${
            activeLink === "playlist" ? "text-[#fff]" : "text-[#fff]/70"
          }`}
        >
          <PlaylistIcon />
          <span>Create Playlist</span>
        </Link>
        <Link
          id="liked"
          to={"/liked-songs"}
          onClick={() => handleSidebarLink("liked")}
          className={`w-full flex items-center gap-5 ${
            activeLink === "liked" ? "text-[#fff]" : "text-[#fff]/70"
          }`}
        >
          <LikedSongsIcon />
          <span>Liked Songs</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
