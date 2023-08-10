import React, { useContext } from "react";
import Header from "./Header";

import DrawInfo from "./DrawInfo";
import DrawContext from "../contexts/DrawContext";

import "./DrawContainer.scss";
const DrawContainer = () => {
  const { currentProductDraw } = useContext(DrawContext);
  return (
    <div
      className={`draw-container bg-white shadow-md m-3 product-${currentProductDraw.ProductId.toLowerCase()}`}
    >
      <Header />

      <DrawInfo />
    </div>
  );
};

export default DrawContainer;
