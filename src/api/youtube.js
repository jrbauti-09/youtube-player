import axios from "axios";

const key = process.env.REACT_APP_UTUBE_API;

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key,
  },
});
