import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.action";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import ShopPage from "./pages/shop/shop.component";
import {auth, createUserProfileFirebaseDocument} from "./firebase/firebase.utils"

import './App.css';

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
                <Route exact path="/" element={<HomePage/>}/>
                <Route path='/shop' element={<ShopPage/>}/>
                <Route path='/sign-in' element={<SignInAndSignUp/>}/>
            </Routes>
        </div>;
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
