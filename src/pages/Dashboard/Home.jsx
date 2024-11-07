import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../hook/useEnv";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const {
    accessToken,
    setPlay,
    setPlaying,
    setCurrentPlaying,
    setCurrentPlayingMusic,
  } = useContext(Context);
  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  const [showAllReleases, setShowAllReleases] = useState(false);
  const [showAllTopSongs, setShowAllTopSongs] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    const getCategories = async () => {
      try {
        const res = await spotifyApi.getCategories();
        setCategories(res.body.categories.items);
      } catch (err) {
        setError("Failed to load categories.");
      }
    };

    const getNewReleases = async () => {
      try {
        const res = await spotifyApi.searchTracks("songs in Uzbekistan");
        setNewReleases(
          res.body.tracks.items.map((item) => {
            const newData = {
              id: item.id,
              name: item.name,
              image: item.album.images[0].url,
              artistName: item.artists[0].name,
              uri: item.uri,
            };
            return newData;
          })
        );
      } catch (err) {
        setError("Failed to load new releases.");
      }
    };

    const getTopSongs = async () => {
      try {
        const res = await spotifyApi.searchTracks("Top Songs in Uzbekistan");
        setTopSongs(
          res.body.tracks.items.map((item) => {
            const newData = {
              id: item.id,
              name: item.name,
              image: item.album.images[0].url,
              artistName: item.artists[0].name,
              uri: item.uri,
            };
            return newData;
          })
        );
      } catch (err) {
        console.log(err);
        setError("Failed to load new top mixes.");
      }
    };

    getCategories();
    getNewReleases();
    getTopSongs();
    setLoading(false);
  }, [accessToken]);

  function handleNavigate(item) {
    setPlay(item.uri);
    setPlaying(true);
    setCurrentPlaying(true);
    setCurrentPlayingMusic(item);
    navigate(`/music/${item.id}`);
  }

  function handleNavigateCategory(item) {
    navigate(`/category/${item.id}`);
  }
  if (loading)
    return (
      <div className="text-white w-full h-screen">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="w-full home-bg min-h-screen">
      <div className="px-[40px] pt-[20px] pb-[80px] h-full">
        <h1 className="text-[40px] font-bold text-white">Good afternoon!</h1>

        <div className="categories flex flex-wrap justify-between gap-4 mt-[20px]">
          {categories.slice(0, 6).map((category) => (
            <div
              key={category.id}
              className="category w-[45%] flex items-center overflow-hidden rounded-lg bg-[#000]/20 gap-4 cursor-pointer hover:bg-[#000]/50"
              onClick={() => handleNavigateCategory(category)}
            >
              <img
                className="h-[82px]"
                src={category.icons[0].url}
                alt={category.name}
                width={82}
                height={82}
              />
              <div>
                <h2 className="text-[20px] font-bold text-white">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="newreleases mt-[50px]">
          <div className="w-full flex items-center justify-between mb-[26px]">
            <h2 className="text-[30px] text-white font-bold">New releases</h2>
            <button
              id="new-releases"
              onClick={() => setShowAllReleases(!showAllReleases)}
              className="text-[#fff]/70 text-[18px]"
            >
              {showAllReleases ? "Show less" : "See all"}
            </button>
          </div>
          <div className="w-full flex flex-wrap justify-between gap-5">
            {(showAllReleases
              ? newReleases.slice(0, 12)
              : newReleases.slice(0, 4)
            ).map((item) => (
              <div
                key={item.id}
                className="w-[23%] flex flex-col items-center p-5 gap-4 bg-[#000]/10 rounded-lg cursor-pointer"
                onClick={() => handleNavigate(item)}
              >
                <img
                  className="h-[182px] rounded"
                  src={item.image}
                  alt={item.name}
                  width={182}
                  height={182}
                />
                <div className="w-full flex flex-col justify-between">
                  <h3 className="text-[18px] font-bold text-white">
                    {item.name}
                  </h3>
                  <p className="text-[16px] text-[#fff]/70">
                    {item.artistName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="newreleases mt-[50px]">
          <div className="w-full flex items-center justify-between mb-[26px]">
            <h2 className="text-[30px] text-white font-bold">Top Mixes</h2>
            <button
              id="top-songs"
              onClick={() => setShowAllTopSongs(!showAllTopSongs)}
              className="text-[#fff]/70 text-[18px]"
            >
              {showAllTopSongs ? "Show less" : "See all"}
            </button>
          </div>
          <div className="w-full flex flex-wrap justify-between gap-5">
            {(showAllTopSongs
              ? topSongs.slice(0, 12)
              : topSongs.slice(0, 4)
            ).map((item) => (
              <div
                key={item.id}
                className="w-[23%] flex flex-col items-center p-5 gap-4 bg-[#000]/10 rounded-lg cursor-pointer"
                onClick={() => handleNavigate(item)}
              >
                <img
                  className="h-[182px] rounded"
                  src={item.image}
                  alt={item.name}
                  width={182}
                  height={182}
                />
                <div className="w-full flex flex-col justify-between">
                  <h3 className="text-[18px] font-bold text-white">
                    {item.name}
                  </h3>
                  <p className="text-[16px] text-[#fff]/70">
                    {item.artistName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
