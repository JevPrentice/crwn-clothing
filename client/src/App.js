import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {connect} from "react-redux";
import {selectCurrentUser} from "./redux/user/user.selector";
import {setCurrentUser} from "./redux/user/user.actions";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

import './App.css';
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {createStructuredSelector} from "reselect";
import CurrentUserContext from "./contexts/current-user/current-user.context";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    this.setState({
                        currentUser: {
                            id: snapShot.id,
                            ...snapShot.data()
                        }
                    });
                });
            }

            this.setState({currentUser: userAuth});
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return <div>
            <CurrentUserContext.Provider value={this.state.currentUser}>
                <Header/>
            </CurrentUserContext.Provider>

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path='/shop/*' element={<ShopPage/>}/>
                <Route path='/checkout' element={<CheckoutPage/>}/>

                <Route path='/sign-in' element={this.state.currentUser ? <Navigate to='/'/> : <SignInAndSignUp/>}/>
            </Routes>
        </div>;
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

