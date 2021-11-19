import React from "react";

import {useSelector} from "react-redux";
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
        <TotalContainer><span>Total: ${total}</span></TotalContainer>

        <WarningContainer>* Please use the following test credit card for payment<br/>
            4242 4242 4242 4242 - EXP 01-22 CVV 123
        </WarningContainer>

        <StripeButton price={total}/>
    </CheckoutPageContainer>;
};

export default CheckoutPage;
