import React, {useContext} from "react";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {CartContext} from "../../providers/cart.provider";

const CartDropdown = () => {
    const navigate = useNavigate();
    const {cartItems, toggleHidden} = useContext(CartContext);
    return <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length
                    ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                    : <span className='emptyMessage'>Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
            toggleHidden();
            navigate("/checkout");
        }}>GO TO CHECKOUT</CustomButton>
    </div>;
};

export default CartDropdown;
