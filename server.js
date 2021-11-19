const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

const compression = require('compression');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.use(enforce.HTTPS({trustProtoHeader: true}));
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

app.listen(port, error => {
    if (error) {
        throw error;
    }
    console.log('Server running on port', port);
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'GBP'
    };

    stripe.charges.create(body, (stripeError, stripeRes) => {
        if (stripeError) {
            res.status(500).sendStatus(stripeError);
        } else {
            res.status(200).send({success: stripeRes});
        }
    });
});
