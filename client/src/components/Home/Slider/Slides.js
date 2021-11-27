import React from "react";
import "./Slider.css";

const slidesInfo = [
  {
    src:
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    alt: "Jordan",
    desc: "Jordan",
  },
  {
    src:
      "https://images.unsplash.com/photo-1583831643960-16a87e5a3fe6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80",
    alt: "New Balance",
    desc: "New Balance",
  },
  {
    src:
      "https://images.unsplash.com/photo-1605856302642-bdf3d79c4f4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    alt: "Air",
    desc: "Air",
  },
  {
    src:
      "https://images.unsplash.com/photo-1494609626232-e95194acf740?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    alt: "Adidas",
    desc: "Adidas",
  },
  {
    src:
      "https://images.unsplash.com/photo-1590483467032-2ecd0559da65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    alt: "Nike",
    desc: "Nike",
  },
];

const slides = slidesInfo.map((slide) => (
  <div className="slide-container">
    <img src={slide.src} alt={slide.alt} />
    <div className="slide-desc">
      <span>{slide.desc}</span>
    </div>
  </div>
));

export default slides;
