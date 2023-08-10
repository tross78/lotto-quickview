// DrawProvider.js

import React, { useState } from 'react';
import DrawContext from './DrawContext';

const DrawProvider = ({ children, initialDraw, initialProductDraws}) => {
    const [currentProductDraw, setCurrentProductDraw] = useState(initialDraw || {});
    const [allProductDraws, setAllProductDraws] = useState(initialProductDraws || []); // or initialize it with the proper default structure

    return (
        <DrawContext.Provider value={{ currentProductDraw, setCurrentProductDraw, allProductDraws, setAllProductDraws }}>
            {children}
        </DrawContext.Provider>
    );
};

export default DrawProvider;
