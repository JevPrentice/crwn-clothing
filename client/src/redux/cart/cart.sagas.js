import {all, call, put, takeLatest} from "redux-saga/effects"
import UserActionTypes from "../user/user.types";
import {clearCart} from "./cart.actions";
import CartActionTypes from "./cart.types";

export function* clearCartOnSignOut() {
    yield put(clearCart());
}

export function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onClearCart() {
    yield takeLatest(CartActionTypes.CLEAR_CART, clearCart);
}

export function* cartSagas() {
    yield all([call(onSignOutSuccess)]);
}
