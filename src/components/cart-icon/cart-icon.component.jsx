import React from "react";

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import "./cart-icon.styles.scss"
import {toggleCartHidden} from "../../redux/cart/cart.actions";
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";
import {useDispatch, useSelector} from "react-redux";

const CartIcon = () => {
    const itemCount = useSelector(selectCartItemsCount);
    const dispatch = useDispatch();
    return <div className='cart-icon' onClick={() => dispatch(toggleCartHidden())}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
};

export default CartIcon;
