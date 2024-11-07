import React, { useContext, useEffect, useState } from "react";
import { CLIENT_ID } from "../../hook/useEnv";
import SpotifyWebApi from "spotify-web-api-node";
import { useParams } from "react-router-dom";
import { Context } from "../../context/Context";

const Category = () => {
  const { id } = useParams(); 
  const { accessToken, setPlay, setPlaying, play } = useContext(Context);

  const [albumDetails, setAlbumDetails] = useState({});
  const [allMusics, setAllMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
  });

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    const fetchAlbumDetails = async () => {
      try {
        const albumResponse = await spotifyApi.getAlbum(id);
        console.log(albumResponse);
        setAlbumDetails(albumResponse.body);
      } catch (err) {
        console.error("Error fetching album details:", err);
      }
    };

    fetchAlbumDetails();
  }, [accessToken, id]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchAlbumTracks = async () => {
      try {
        const trackResponse = await spotifyApi.getAlbumTracks(id);
        setAllMusics(
          trackResponse.body.items.map((item) => ({
            id: item.id,
            name: item.name,
            artistName: item.artists[0].name,
            preview_url: item.preview_url,
            uri: item.uri,
            isPlaying: false,
          }))
        );
      } catch (err) {
        console.error("Error fetching album tracks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumTracks();
  }, [accessToken, id]);

  const filteredTracks = allMusics.filter(
    (track) =>
      track.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      track.artistName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  console.log(filteredTracks);

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
          {albumDetails?.images && (
            <img
              className="h-[297px]"
              src={albumDetails.images[0].url}
              alt={albumDetails.name}
              width={297}
              height={297}
            />
          )}
          <div>
            <h1 className="text-[5rem] font-bold text-white">
              {albumDetails?.name}
            </h1>
            <p className="text-[1.5rem] text-white">
              <strong>Artist: </strong>
              {albumDetails?.artists?.[0]?.name}
            </p>
          </div>
        </div>

        <div className="related-tracks mt-6">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-[2rem] font-bold text-white mb-4">
              Album Tracks
            </h2>
            <input
              type="text"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              placeholder="Search"
              className="mb-4 p-2 rounded border-b-[1px] border-gray-300 text-white placeholder:text-white bg-transparent"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#000]/10 rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-left text-white">#</th>
                  <th className="px-4 py-2 text-left text-white">Track Name</th>
                  <th className="px-4 py-2 text-left text-white">Artist</th>
                  <th className="px-4 py-2 text-left text-white">Preview</th>
                </tr>
              </thead>
              <tbody>
                {filteredTracks.map((track, index) => (
                  <MusicTableRow
                    allMusics={allMusics}
                    setAllMusics={setAllMusics}
                    track={track}
                    index={index}
                    setPlay={setPlay}
                    setPlaying={setPlaying}
                    key={track.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
