import React from "react";
import "./Footer.css";
import marca from './logo.png';



const Footer = () => {
  return (
    
    <footer className="footer">
      <div className="footer-info">
        <h1><img src={marca} alt=""/></h1>
        <p>SNEAKERS</p>
      </div> 
      <section className="widget widget_blog_subscription">
  <form action="#"  accept-charset="utf-8" id="subscribe-blog">
    <p>Subscribe to our newsletter.</p>
    <p>
      <input type="text" name="email" placeholder="Enter your email address"  id="subscribe-field"/>
    </p>
    <p>
      <input type="submit" value="Follow me!"/>
    </p>
  </form>
</section>
      <div className="footer-contact">
        <p>Business Hours<br/>Lu a Vi 9:30-12:30, 13:30-19:30 <br/> Sa 9:30-12:30</p>
      </div>
      <div className="footer-sns">
        <div className="design-by"></div>
       
        <div className="sns-links">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook facebook"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
