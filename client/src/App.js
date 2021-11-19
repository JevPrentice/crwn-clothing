import React, {lazy, Suspense, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentUser} from "./redux/user/user.selector";
import {checkUserSession} from "./redux/user/user.actions";

import {GlobalStyle} from "./global.styles"
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundry/error.boundry.component";
import Header from "./components/header/header.component";

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = () => {
    const currentUser = useSelector(selectCurrentUser);
    // const isHidden = useSelector((state) => state.cart.hidden);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    return <>
        <Header/>
        <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
                <GlobalStyle/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path='/shop/*' element={<ShopPage/>}/>
                    <Route path='/checkout' element={<CheckoutPage/>}/>
                    <Route path='/sign-in' element={currentUser ? <Navigate to='/'/> : <SignInAndSignUp/>}/>
                </Routes>
            </Suspense>
        </ErrorBoundary>
    </>;
}

export default App;
