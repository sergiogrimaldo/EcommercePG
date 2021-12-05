import React from "react";
import "./Cover.css";
import coverVideo from "./media/videos.mp4";

const Cover = () => {
  return (
    <div className="cover-container">
      <video className="video" src={coverVideo} autoPlay loop muted/>
      <h1>JamStack Ecommerce</h1>
      <p>Sneakers | Modern | Shop | Youth </p>
      
    </div>
  );
};

export default Cover;