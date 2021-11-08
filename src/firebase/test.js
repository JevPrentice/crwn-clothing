import firebase from "firebase/compat/app";
import "firebase/firestore";

const firestore = firebase.firestore();

// const aSpecificUsersCart = firestore
//     .collection('users')
//     .doc('xxx')
//     .collection('cartItems')
//     .doc("yyy");

const aSpecificUsersCart = firestore.doc("/users/xxx/cartItems/yyy");
firestore.collection("/users/xxx/cartItems");


console.log(aSpecificUsersCart)
