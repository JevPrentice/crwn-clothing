import React from "react";
import CustomButton from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";
import {useDispatch, useSelector} from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems} from "../../redux/cart/cart.selectors";
import {useNavigate} from "react-router-dom";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const CartDropdown = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    return <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.length
                    ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                    : <span className='emptyMessage'>Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
            dispatch(toggleCartHidden())
            navigate("/checkout");
        }}>GO TO CHECKOUT</CustomButton>
    </div>;
};

export default CartDropdown;
