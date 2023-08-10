import React from "react";
import { format } from 'date-fns';

const DrawCarouselItem = React.memo(({ draw, isActive, index }) => (
  <div
    className={`relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none ${!isActive ? 'hidden': ''}`}
    {...(isActive ? { "data-te-carousel-active": true } : {})}
    data-te-carousel-item
    style={{ backfaceVisibility: "hidden"}}
  >
    {/* Your dynamic content */}
    <div className="w-full text-center text-white md:block">
      <h5 className="text-xl">Draw {draw.DrawNumber}</h5>
      <p>{format(new Date(draw.DrawDate), 'EEE, d MMM yyyy')}</p>
    </div>
  </div>
));

export default DrawCarouselItem;
