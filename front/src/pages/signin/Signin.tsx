import React, { useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { customAxios } from '@src/utils/CustomAxios';
import { ToastContainer, toast } from 'react-toastify';
import "@pages/signin/Signin.css"

function Signin(): JSX.Element {
    const emailInput = useRef<HTMLInputElement>(null);
    const pwdInput = useRef<HTMLInputElement>(null);

    const history = useHistory();

    const inputOnKeyPressHandler = (e: any) => {
        if (e.target.id == 'signin-email' && e.key == 'Enter') {
            pwdInput.current?.focus();
        }
        
        if (e.target.id == 'signin-password' && e.key == 'Enter') {
            processSignin();
        }
    }

    const processSignin = async () => {
        const email = emailInput.current?.value,
            password = pwdInput.current?.value;
            
        const res = await customAxios.post('/signin', {email, password});
        if (res.data.message == 'success') {
            history.push("/");
        } else {
            toast.error("Incorrect username or password.", {theme: "colored"});
        }
    }

    return (
        <div id="signin-content" className="content">
            <div id="signin-logoBox" className="logoBox">
                <img className="logo" src={process.env.PUBLIC_URL + '/logo.png'} alt=""/>
            </div>
            <div id="signin-box">
                <div>
                    <label className="signin-label">Username or email address</label>
                    <br/>
                    <input 
                        id="signin-email" 
                        className="signin-input" 
                        type="text" 
                        ref={emailInput}
                        onKeyPress={inputOnKeyPressHandler}
                    />
                </div>
                <div>
                    <label className="signin-label">Password</label>
                    <br/>
                    <input 
                        id="signin-password" 
                        className="signin-input" 
                        type="password" 
                        ref={pwdInput}
                        onKeyPress={inputOnKeyPressHandler}
                    />
                </div>
                <div 
                    id="signin-btn"
                    onClick={processSignin}
                >
                    Sign in
                </div>
                <ToastContainer />
            </div>
            <div id="signin-signup-box">
                New to I.S.B?
                <Link to="/signup" id="signin-to-signup"> Create an account.</Link>                
            </div>
        </div>
    )
}

export default Signin;