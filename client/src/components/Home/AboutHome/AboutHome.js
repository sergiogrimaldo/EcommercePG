import React from "react";
import "./About.css";

const AboutHome = () => {
  return (
    <div className="about-container">
      <div className="about-desc">
        <h3>Our Company</h3>
        <p>
        we are a modern shoe company with a variety of styles. We take care of 
        having the best products on the market for the satisfaction of our customers
        </p>
      </div>
      <div className="about-img">
        <img
          src="https://images.unsplash.com/photo-1565814636199-ae8133055c1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="about"
        />
      </div>
    </div>
  );
};

export default AboutHome;

