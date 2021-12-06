import React from "react";
import "./Info.css";
import GoogleMaps from "simple-react-google-maps";
const Info = () => {
  return (
    <div className="info-container">
      <div className="info">
        <h1>You can meet us and buy the best shoes.</h1>
        <GoogleMaps
          apiKey={"AIzaSyAIoaqD6zupornIMbdYcAfDaTSHjAjFWJ4"}
          style={{ height: "300px", width: "300px" }}
          zoom={12}
          center={{
            lat:-34.6156625,
            lng: -58.5033387,
          }}
          markers={[
            { lat: -34.5619824, lng: -58.5227743 },
            { lat:-34.5282922, lng: -58.533495 },
            { lat: 4.7123474, lng: -74.2025837 },
            { lat: 4.6895686, lng: -74.088142 },
          ]}
        />
      </div>
      
    </div>
  );
};

export default Info;
