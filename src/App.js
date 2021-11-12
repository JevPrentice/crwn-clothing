import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {connect} from "react-redux";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

import './App.css';
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.component";
import {checkUserSession} from "./redux/user/user.actions";

class App extends React.Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        const {checkUserSession} = this.props;
        checkUserSession();
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth?.();
    }

    render() {
        return <div>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path='/shop/*' element={<ShopPage/>}/>
                <Route path='/checkout' element={<CheckoutPage/>}/>
                <Route path='/sign-in' element={this.props.currentUser ? <Navigate to='/'/> : <SignInAndSignUp/>}/>
            </Routes>
        </div>;
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
