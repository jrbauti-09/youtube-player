import React, { useState } from "react";
import youtubeApi from "../api/youtube";
import YouTube from "react-youtube";
import Youtube from "../api/youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

export default function Search() {
  const [title, setTitle] = useState("");
  const [videoId, setVideoId] = useState("XXYlFuWEuKI");
  const [videoArray, setVideoArray] = useState([]);

  const checkTitle = () => {
    if (!title.length) window.alert("Please provide a title when submitting.");
  };

  const onSearch = async (keyword) => {
    const response = await youtubeApi.get("/search", {
      params: {
        q: keyword,
      },
    });
    // console.log(response.data.items[0].id.videoId);

    await setVideoId(response.data.items[0].id.videoId);

    const array = [];

    for (let video of response.data.items) {
      array.push(video);
    }

    await setVideoArray(array);

    console.log(array);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    checkTitle();
    onSearch(title);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-controls">
            <label>Search</label>
            <input
              id="video-search"
              type="text"
              placeholder="Enter Search keyword.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
        </form>
      </div>
      <div>
        <YouTube videoId={videoId} opts={opts} />
      </div>
      <div>
        <h2>Other selections..</h2>
        {videoArray.map((videoInfo) => {
          return (
            <>
              <div onClick={(e) => setVideoId(videoInfo.id.videoId)}>
                <h3>{videoInfo.snippet.title}</h3>
                <img src={videoInfo.snippet.thumbnails.default.url}></img>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
