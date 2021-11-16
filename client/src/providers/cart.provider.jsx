import {createContext, useEffect, useState} from "react";
import {
    addItemToCart,
    filterItemFromCart,
    getCartItemsCount,
    getCartItemsPrice,
    removeItemFromCart
} from "./cart.utils";

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {
    },
    cartItems: [],
    addItem: () => {
    },
    removeItem: () => {
    },
    clearItemFromCart: () => {
    },
    cartItemsCount: 0,
    cartItemsPrice: 0
});

export const CartProvider = ({children}) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartItemsPrice, setCartItemsPrice] = useState(0);

    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);
    const clearItemFromCart = (item) => setCartItems(filterItemFromCart(cartItems, item));

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
    }, [cartItems]);

    useEffect(() => {
        setCartItemsPrice(getCartItemsPrice(cartItems));
    }, [cartItems]);

    return <CartContext.Provider value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        cartItemsCount,
        removeItem,
        clearItemFromCart,
        cartItemsPrice
    }}>
        {children}
    </CartContext.Provider>
};

export default CartProvider;
