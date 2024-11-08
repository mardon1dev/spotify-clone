import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";
import SpotifyWebApi from "spotify-web-api-node";
import { CLIENT_ID } from "../../hook/useEnv";
import MusicTableRow from "../../components/MusicTableRow";
import {
  CurrentPlayingActiveIcon,
  CurrentPlayingIcon,
  LikeIcon,
} from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { addLiked } from "../../store/LikedSlice";

const SinglePage = () => {
  const liked = useSelector((state) => state.liked.likedList);
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    accessToken,
    setPlay,
    setPlaying,
    play,
    playing,
    currentPlaying,
    setCurrentPlaying,
    currentPlayingMusic,
    setCurrentPlayingMusic,
  } = useContext(Context);

  const [singleTrack, setSingleTrack] = useState({});
  const [allMusics, setAllMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, id]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchSingleTrack = async () => {
      try {
        const response = await spotifyApi.getTrack(id);
        const newTrack = {
          id: response.body.id,
          name: response.body.name,
          artistName: response.body.artists?.[0].name,
          image: response.body.album.images?.[0].url,
          uri: response.body.uri,
          isPlaying: true,
        };
        setSingleTrack(newTrack);
      } catch (err) {
        console.error("Error fetching track:", err);
      }
    };
    fetchSingleTrack();
    setLoading(false);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || !singleTrack.name) return;

    const fetchRelatedTracks = async () => {
      try {
        const response = await spotifyApi.searchTracks(singleTrack.name);
        setAllMusics(
          response.body.tracks.items.map((item) => {
            return {
              id: item.id,
              name: item.name,
              artistName: item.artists[0].name,
              image: item.album.images[0].url,
              preview_url: item.preview_url,
              uri: item.uri,
              isPlaying: false,
            };
          })
        );
      } catch (err) {
        console.error("Error fetching related tracks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedTracks();
  }, [singleTrack?.name, accessToken]);

  useEffect(() => {
    setCurrentPlaying(play.includes(currentPlayingMusic.id));
  }, [play, currentPlayingMusic.id]);


  function togglePlay() {
    setCurrentPlaying(!currentPlaying);
    setPlay(singleTrack.uri);
    setPlaying(!playing);
    setCurrentPlayingMusic(singleTrack)
  }

  console.log(allMusics);

  const filteredTracks = allMusics.filter(
    (track) =>
      track.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      track.artistName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  function handleLike(item) {
    dispatch(addLiked(item));
  }

  const isPlaying = singleTrack.id == currentPlayingMusic.id;
  const isLiked = liked.some((likedTrack) => likedTrack.id === singleTrack.id);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading ...
      </div>
    );
  }

  return (
    <div className="w-full single-page min-h-screen">
      <div className="px-[40px] pt-[20px] pb-[80px] h-full">
        <div className="w-full flex items-start gap-5">
          {singleTrack && (
            <img
              className="h-[297px]"
              src={singleTrack?.image}
              alt={singleTrack?.name}
              width={297}
              height={297}
            />
          )}
          <div>
            <h1 className="text-[5rem] font-bold text-white">
              {singleTrack?.name}
            </h1>
            <p className="text-[1.5rem] text-white">
              <strong>Made by: </strong>
              {singleTrack?.artistName}
            </p>
          </div>
        </div>

        <div className="py-[30px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={togglePlay}>
              {isPlaying && currentPlaying ? (
                <CurrentPlayingActiveIcon />
              ) : (
                <CurrentPlayingIcon />
              )}
            </button>
            <button
              className={`${
                isLiked ? "text-green-500" : "text-white"
              } scale-125`}
              onClick={() => handleLike(singleTrack)}
            >
              <LikeIcon />
            </button>
          </div>
          <input
            type="text"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            placeholder="Search"
            className="mb-4 p-2 rounded border-b-[1px] border-gray-300 bg-transparent text-white placeholder:text-white outline-none"
          />
        </div>

        <div className="related-tracks">
          <h2 className="text-[2rem] font-bold text-white mb-4">
            Related Tracks
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#000]/10 rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-left text-white">#</th>
                  <th className="px-4 py-2 text-left text-white">Image</th>
                  <th className="px-4 py-2 text-left text-white">Track Name</th>
                  <th className="px-4 py-2 text-left text-white">Artist</th>
                  <th className="px-4 py-2 text-left text-white">Preview</th>
                  <th className="px-4 py-2 text-left text-white">Like</th>
                </tr>
              </thead>
              <tbody>
                {filteredTracks.length > 0 ? (
                  filteredTracks.map((track, index) => (
                    <MusicTableRow
                      track={track}
                      index={index}
                      setPlay={setPlay}
                      setPlaying={setPlaying}
                      key={track.id}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-white py-4">
                      No tracks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
