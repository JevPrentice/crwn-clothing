import React from "react";

import {useDispatch, useSelector} from "react-redux";
import {selectCartItems, selectCartTotal} from "../../redux/cart/cart.selectors";
import CheckoutItem from "../../components/checkout-item/checkout.item.component";
import StripeButton from "../../components/stripe-button/stripe-button.component";
import {
    CheckoutHeaderContainer,
    CheckoutPageContainer,
    HeaderBlockContainer,
    TotalContainer,
    WarningContainer
} from "./checkout.styles";

const CheckoutPage = () => {
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    return <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
        </CheckoutHeaderContainer>
        {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
        <TotalContainer><span>Total: £{total}</span></TotalContainer>

        <WarningContainer>This is a demo integration with Stripe for a successful message please use the
            following test credit card for payment, dont worry there be no actual payment made!<br/>
            Credit card number: 4242 4242 4242 4242<br/>
            Expiry: 01-{(new Date().getFullYear() + 1).toString().substr(2)}<br/>
            CVV: 123
        </WarningContainer>
        <StripeButton price={total}/>
    </CheckoutPageContainer>;
};

export default CheckoutPage;
