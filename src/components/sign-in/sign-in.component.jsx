import React, {useState} from "react"

import "./sign-in.styles.scss"
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {emailSignInStart, googleSignInStart} from "../../redux/user/user.actions";
import {connect} from "react-redux";

const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [userCredentials, setCredentials] = useState({email: '', password: ''})
    const {email, password} = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({...userCredentials, [name]: value});
    }

    return <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
            <FormInput name='email' type='email'
                       value={email}
                       onChange={handleChange}
                       label='Email'
                       required/>
            <FormInput name='password' type='password'
                       value={password} onChange={handleChange}
                       label='Password'
                       required/>

            <div className='buttons'>
                <CustomButton type='submit'> Sign in </CustomButton>
                <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn> Sign in with
                    Google {''} </CustomButton>
            </div>
        </form>
    </div>
}

const mapDispatchToProps = dispatch => ({
    "googleSignInStart": () => dispatch(googleSignInStart()),
    "emailSignInStart": (email, password) => dispatch(emailSignInStart({email, password}))
});

export default connect(null, mapDispatchToProps)(SignIn);
