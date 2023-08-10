import React from "react";
import DrawContainer from "./DrawContainer";
import "./DrawOverview.scss";
import DrawProvider from "../contexts/DrawProvider";

const DrawOverview = ({ allDraws = [] }) => {
    allDraws.reduce((acc, group) => {
            acc[group.productId] = group.draws[0];
            return acc;
        })
    console.log(allDraws)
  return (
    <div className="draw-overview bg-gray-500 w-full p-6 flex flex-wrap grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {allDraws.map((group) => (
        <DrawProvider key={group.productId} initialDraw={group.draws[group.draws.length - 1]} initialProductDraws={group.draws}>
          <DrawContainer />
        </DrawProvider>
      ))}
    </div>
  );
};

export default DrawOverview;
