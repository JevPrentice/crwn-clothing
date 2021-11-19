import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51JuC7QDkHqHVyY37pu7wKGY5jUcrMX6S8yKukRiOgAvT2qX0CVrnCSu3bZCX7V9Ogdc0lAPlivCJJAAe9Vrh9NMz00w5kYI5cm";

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert("Payment successful");
            console.log("Payment response:", response);
        }).catch(error => {
            console.log('Payment error', error);
            alert("There was an issue with your payment, please make sure you used the provided test credit card");
        });
    };

    return <StripeCheckout label='Pay now' name='CRWN Clothing Ltd.'
                           billingAddress
                           shippingAddress
                           description={`Your total is $${price}`}
                           amount={priceForStripe}
                           panelLabel='Pay now'
                           token={onToken}
                           stripeKey={publishableKey}/>
};

export default StripeButton;
