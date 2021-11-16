import React, {useState} from "react"

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-up.styles.scss"
import {signUpStart} from "../../redux/user/user.actions";
import {useDispatch} from "react-redux";

const SignUp = () => {

    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const {displayName, email, password, confirmPassword} = userCredentials;

    const dispatch = useDispatch();

    const handleSubmit = async event => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("Passwords dont match!")
            return;
        }

        dispatch(signUpStart({displayName, email, password}));
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setUserCredentials({...userCredentials, [name]: value});
    }

    return <div className='sign-up'>
        <h2>
            I do not have an account </h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput type='text' name='displayName' value={displayName}
                       onChange={handleChange} label="Display name" required/>
            <FormInput type='email' name='email' value={email}
                       onChange={handleChange} label='Email' required/>
            <FormInput type='password' name='password' value={password}
                       onChange={handleChange} label="Password" required/>
            <FormInput type='password' name='confirmPassword' value={confirmPassword}
                       onChange={handleChange} label="Confirm password" required/>
            <CustomButton type='submit'> SIGN UP </CustomButton>
        </form>
    </div>
}

export default SignUp;
