import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import {auth, createUserProfileFirebaseDocument} from "./firebase/firebase.utils"

import './App.css';
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends React.Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        const {setCurrentUser} = this.props
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileFirebaseDocument(userAuth, {});
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }
            setCurrentUser(userAuth)
        });
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

const mapStateToProps = ({user}) => createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
