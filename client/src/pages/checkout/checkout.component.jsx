import React, {useContext} from "react";

import './checkout.styles.scss'
import CheckoutItem from "../../components/checkout-item/checkout.item.component";
import StripeButton from "../../components/stripe-button/stripe-button.component";
import {CartContext} from "../../providers/cart.provider";

const CheckoutPage = () => {
    const {cartItems, cartItemsPrice} = useContext(CartContext);

    return <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
        }
        <div className='total'><span>Total: ${cartItemsPrice}</span></div>

        <div className='test-warning'>* Please use the following test credit card for payment<br/>
            4242 4242 4242 4242 - EXP 01-22 CVV 123
        </div>

        <StripeButton price={cartItemsPrice}/>
    </div>;
};

export default CheckoutPage;
