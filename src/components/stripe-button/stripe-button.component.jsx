import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_51JuC7QDkHqHVyY37pu7wKGY5jUcrMX6S8yKukRiOgAvT2qX0CVrnCSu3bZCX7V9Ogdc0lAPlivCJJAAe9Vrh9NMz00w5kYI5cm";

    const onToken = token => console.log(token);

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
