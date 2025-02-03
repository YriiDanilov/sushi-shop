import React from 'react';
import { AppContext } from '../../Context';

export const useCart = () => {
    const { itemsCart, setItemsCart } = React.useContext(AppContext);
    const totalPrice = itemsCart.reduce(
        (sum, obj) => Number(obj.price) + sum,
        0
    );

    return { itemsCart, setItemsCart, totalPrice };
};
