import React from 'react';

export const PriceLabel: React.FC<React.HTMLAttributes<HTMLParagraphElement> & { price: number }> = ({
    price,
    ...props
}) => {
    const formattedPrice = price.toFixed(2);
    return <p {...props}>${formattedPrice}</p>;
};