import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./redux/store";

import {ApolloClient, ApolloProvider, gql, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://crwn-clothing.com',
    cache: new InMemoryCache()
});

client.writeQuery({
    query: gql`
    query WriteTodo($id: Int!) {
      todo(id: $id) {
        id
        text
        completed
      }
    }`,
    data: { // Contains the data to write
        todo: {
            __typename: 'Todo',
            id: 5,
            text: 'Buy grapes 🍇',
            completed: false
        },
    },
    variables: {
        id: 5
    }
});

// client.query({
//     query: gql`
//     {
//         getCollectionsByTitle(title: "hats") {
//             id
//             title
//             items {
//                 id
//                 name
//                 price
//                 imageUrl
//             }
//         }
//     }
//     `
// }).then(res => console.log("res", res));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <React.StrictMode>
                <BrowserRouter>
                    <PersistGate persistor={persistor}>
                        <App/>
                    </PersistGate>
                </BrowserRouter>
            </React.StrictMode>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
