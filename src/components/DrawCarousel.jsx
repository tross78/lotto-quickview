import React, { useContext, useEffect, useRef, useCallback} from "react";
import { Carousel, initTE } from "tw-elements";
import "./DrawCarousel.scss";
import DrawContext from "../contexts/DrawContext";
import DrawCarouselItem from "./DrawCarouselItem";
// SVG Components
const SVGProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 40 40",
  strokeWidth: "3",
  stroke: "currentColor",
  className: "h-8 w-8",
};

const LeftArrow = React.memo(() => (
  <svg {...SVGProps}>
    {/* Circle around the arrow */}
    <circle cx="20" cy="20" r="18" stroke="currentColor" fill="none" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.5 11.5l-7.5 7.5 7.5 7.5"></path>

  </svg>
));

const RightArrow = React.memo(() => (
  <svg {...SVGProps}>
    {/* Circle around the arrow */}
    <circle cx="20" cy="20" r="18" stroke="currentColor" fill="none" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17 11.5l7.5 7.5-7.5 7.5"
    />
  </svg>
));

const renderCarouselItems = (draws) => {

  if (draws.length === 0) {
    // Return default item
    return (
      <div
        className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-item
        style={{ backfaceVisibility: "hidden" }}
      ></div>
    );
  } else {
    // Return items from draws
    return draws
      .map((draw, index) => (
        <DrawCarouselItem
          draw={draw}
          isActive={index === draws.length - 1}
          index={index}
          key={index}
        />
      ));
  }
};

// Main Carousel Component
const DrawCarousel = () => {
  const { currentProductDraw, allProductDraws, setCurrentProductDraw } = useContext(DrawContext);
  const carouselRef = useRef(null);
  const handlePrevSlide = useCallback(() => {
    const newIndex = allProductDraws.findIndex(draw => draw.DrawNumber === currentProductDraw.DrawNumber) - 1;
    if (newIndex >= 0) {
      
      setCurrentProductDraw(allProductDraws[newIndex]);
    }
  }, [allProductDraws, currentProductDraw, setCurrentProductDraw]);

  const handleNextSlide = useCallback(() => {
    const newIndex = allProductDraws.findIndex(draw => draw.DrawNumber === currentProductDraw.DrawNumber) + 1;
    if (newIndex < allProductDraws.length) {
      setCurrentProductDraw(allProductDraws[newIndex]);
    }
  }, [allProductDraws, currentProductDraw, setCurrentProductDraw]);
  useEffect(() => {
    const node = carouselRef.current;
    
    initTE({ Carousel }, true);

    if (node) {
      // Event listener functions
  

      const handleSlideChange = (event) => {
        if (event.direction === "left") {
          handleNextSlide();
        } else if (event.direction === "right") {
          handlePrevSlide();
        }
      };

      node.addEventListener("slide.te.carousel", handleSlideChange);

      // Cleanup
      return () => {
        node.removeEventListener("slide.te.carousel", handleSlideChange);
      };
    }
  }, [handleNextSlide, handlePrevSlide]);

  return (
    <div className="draw-carousel w-full bottom-0 absolute">
      <div
        ref={carouselRef}
        id={`${currentProductDraw.ProductId}-carousel`}
        className="h-full relative carousel"
        data-te-carousel-init
        data-te-wrap="false"
      >

        {renderCarouselItems(allProductDraws)}


        {/* Navigation Buttons */}
        <NavigationButton
          position="left"
          target={`#${currentProductDraw.ProductId}-carousel`}
          direction="prev"
        />
        <NavigationButton
          position="right"
          target={`#${currentProductDraw.ProductId}-carousel`}
          direction="next"
        />
      </div>
    </div>
  );
};

const NavigationButton = ({ position, target, direction }) => {
  const commonClasses =
    "absolute bottom-0 top-0 flex w-[15%] items-center justify-center border-0 bg-gray-500 bg-opacity-50 p-2 text-center text-white z-40";
  return (
    <button
      className={`${position}-0 ${commonClasses}`}
      type="button"
      data-te-target={target}
      data-te-slide={direction}
    >
      <span className="inline-block h-8 w-8">
        {direction === "prev" ? <LeftArrow /> : <RightArrow />}
      </span>
    </button>
  );
};

export default DrawCarousel;