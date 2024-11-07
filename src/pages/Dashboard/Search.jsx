import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../hook/useEnv";
import { useNavigate } from "react-router-dom";
import MyLoader from "../../components/SceletonLoading/MyLoader";

const Search = () => {
  const navigate = useNavigate();
  const { accessToken, setPlay, setPlaying } = useContext(Context);

  const [allMusics, setAllMusics] = useState([]);
  const [allMusicShow, setAllMusicShow] = useState(false);

  const [searchTracks, setSearchTracks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchValue, setSearchValue] = useState("");

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    const getNewReleases = async () => {
      try {
        const res = await spotifyApi.searchTracks(
          "searched songs in Uzbekistan"
        );
        setTimeout(() => {
          setAllMusics(
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
          setLoading(false);
        }, 0);
      } catch (err) {
        setError("Failed to load songs.");
      } finally {
        setLoading(true)
      }
    };
    getNewReleases();
  }, [accessToken]);

  function handleNavigate(item) {
    setPlay(item.uri);
    setPlaying(true);
    navigate(`/music/${item.id}`);
  }
  async function handleSearch(e) {
    e.preventDefault();

    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    try {
      const response = await spotifyApi.searchTracks(searchValue);
      setTimeout(() => {
        setSearchTracks(
          response.body.tracks.items.map((item) => {
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
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log("Error fetching: ", err);
    } finally {
      setSearchValue("");
      setLoading(true)
    }
  }

  return (
    <div className="w-full search-page min-h-screen p-5 pb-[80px]">
      <form autoComplete="off" onSubmit={handleSearch}>
        <h2 className="text-white mb-5 text-[30px] font-bold">
          Search any track
        </h2>
        <label htmlFor="search" className="">
          <input
            type="search"
            name="search"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="w-[400px] py-2 px-4 rounded bg-transparent border-transparent border-[1px] text-white placeholder:text-white outline-none shadow-lg hover:bg-[#655624]"
          />
        </label>
        <button
          className="py-2 px-4 text-white bg-transparent shadow-lg ml-[50px] hover:bg-[#655624] rounded"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="newreleases mt-[50px]">
        <div className="w-full flex items-center justify-between mb-[26px]">
          <h2 className="text-[30px] text-white font-bold">
            Top searched musics
          </h2>
          <button
            id="new-releases"
            onClick={() => setAllMusicShow(!allMusicShow)}
            className="text-[#fff]/70 text-[18px]"
          >
            {allMusicShow ? "Show less" : "See all"}
          </button>
        </div>
        <div className="flex items-center">
          {loading ? (
            [0, 1, 2, 3].map((_, index) => <MyLoader key={index} />)
          ) : (
            <p></p>
          )}
        </div>
        <div className="w-full flex flex-wrap justify-between gap-5">
          {searchTracks.length > 0
            ? (allMusicShow
                ? searchTracks.slice(0, 12)
                : searchTracks.slice(0, 4)
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
              ))
            : allMusicShow
            ? allMusics.slice(0, 12)
            : allMusics.slice(0, 4).map((item) => (
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
  );
};

export default Search;
