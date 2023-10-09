import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(null);

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    const endX = e.clientX;
    const deltaX = startX - endX;

    if (deltaX > 50) {
      // Right swipe, show next slide
      nextSlide();
    } else if (deltaX < -50) {
      // Left swipe, show previous slide
      previousSlide();
    }
  };

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div
      className="overflow-hidden relative w-[500px] h-[630px] border-2 border-gray-300"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={`flex transition ease-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => {
          return <img key={index} src={s} alt={`Slide ${index + 1}`} />;
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <FontAwesomeIcon icon={faChevronRight} flip="horizontal" />
        </button>
        <button onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((_, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer border  ${
                i === current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
