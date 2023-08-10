import React from 'react';

const DrawTimeInfo = ({ drawCloseDateTime, drawEndSellDateTime }) => (
  <div className="time-info">
    <p>Close Time: {drawCloseDateTime}</p>
    <p>End Sell Time: {drawEndSellDateTime}</p>
  </div>
);

export default DrawTimeInfo;
