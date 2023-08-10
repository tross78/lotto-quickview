import React, { useContext } from 'react';
import './DrawInfo.scss';

import DrawContext from '../contexts/DrawContext';
const DrawInfo = () => {
  const { currentProductDraw } = useContext(DrawContext);
  return (
    <div className="draw-info p-3 ">
      <p className="text-black text-lg text-left">Winning Numbers</p>
      <div className="text-left">
        {currentProductDraw.PrimaryNumbers.map((number, index) => (
          <div className="inline-block text-white winning-number primary-number text-center" key={index}>{number}</div>
        ))
     
        }
        

      </div>
      <p className="text-black text-lg text-left mt-3">Supps</p>
      <div className="text-left">
        {currentProductDraw.SecondaryNumbers.map((number, index) => (
          <div className="inline-block text-white winning-number secondary-number text-center" key={index}>{number}</div>
        ))
     
        }
        

      </div>
      {/* Additional information based on isDiv1Estimated, isDiv1Unknown, prizeBoostPercent */}
    </div>
  )
    };

export default DrawInfo;
