// src/components/ImageSlider.js
import React, { useState, useEffect } from "react";
import doc1 from "../assets/img/doc1.jpg";
import doc from "../assets/img/pan1.jpg";
import a1 from "../assets/img/an1.jpg";
import A1 from "../assets/img/an2.jpg";

const imageData = [
  { src: doc1, alt: "Document 1" },
  { src: doc, alt: "PAN Card" },
  { src: a1, alt: "Aadhar" },
  { src: A1, alt: "Income Certificate" },
  { src: doc1, alt: "Document 2" },
  { src: doc1, alt: "Document 3" },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const changeSlide = (direction) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        (prev + direction + imageData.length) % imageData.length
      );
      setFade(true);
    }, 150); // slightly slower fade start for smoother look
  };

  return (
    <div className="w-full md:w-[500px] max-w-full px-4 mt-10 md:mt-0 mx-auto relative">
      {/* Fixed-size slider frame */}
      <div className="relative w-full h-[500px] bg-gray-100 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">

        {/* Image */}
        <img
          src={imageData[currentIndex].src}
          alt={imageData[currentIndex].alt}
          className={`max-w-full max-h-full object-contain transition-opacity duration-700 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
          }}
        />

        {/* Slide counter (top right) */}
        <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-3 py-1 text-sm text-white">
          {currentIndex + 1}/{imageData.length}
        </div>

        {/* Side navigation buttons */}
        <button
          onClick={() => changeSlide(-1)}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-700 hover:text-white transition duration-300"
          title="Previous"
        >
          ❮
        </button>
        <button
          onClick={() => changeSlide(1)}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-md hover:bg-gray-700 hover:text-white transition duration-300"
          title="Next"
        >
          ❯
        </button>
      </div>
    </div>
  );
}