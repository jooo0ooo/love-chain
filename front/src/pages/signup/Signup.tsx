import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { GoCheck } from "react-icons/go";
import classnames from 'classnames';
import TypeWriter from "@components/typeWriter/TypeWriter";
import { isValidEmail, isValidPwd, isValidUsername, sleep } from '@utils/Utils';
import '@pages/signup/Signup.css';

function Signup(): JSX.Element {
    const [emailFormActive, setEmailFormActive] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const [pwdFormActive, setPwdFormActive] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);

    const [usernameFormActive, setUsernameFormActive] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);

    const [createBtnActive, setCreateBtnActive] = useState(false);
    const [activeElement, setActiveElement] = useState("");

    const emailInput = useRef<HTMLInputElement>(null);
    const pwdInput = useRef<HTMLInputElement>(null);
    const usernameInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        sleep(3100).then(() => {
            setEmailFormActive(true);
            emailInput.current?.focus(); 
        });
    }, []);

    useEffect(() => {
        if (activeElement == 'pwd-input') {
            if (!pwdFormActive) {
                setPwdFormActive(true);
                sleep(1).then(() => {
                    pwdInput.current?.focus();
                })
            }
            pwdInput.current?.focus()
        }
        
        if (activeElement == 'username-input') {
            if (!usernameFormActive) {
                setUsernameFormActive(true);
                sleep(1).then(() => {
                    usernameInput.current?.focus();
                })
            }
            usernameInput.current?.focus()
        }
        
        if (activeElement == 'create-btn') {
            setCreateBtnActive(true);
        }
    }, [activeElement]);

    const inputOnChangeHandler = (e: any) => {
        if (e.target.id == 'email-input') {
            if (isValidEmail(e.target.value)) {
                setEmailValid(true);
            } else {
                setEmailValid(false);
            }
        }

        if (e.target.id == 'pwd-input') {
            if (isValidPwd(e.target.value)) {
                setPwdValid(true);
            } else {
                setPwdValid(false);
            }
        }

        if (e.target.id == 'username-input') {
            if (isValidUsername(e.target.value)) {
                setUsernameValid(true);
            } else {
                setUsernameValid(false);
            }
        }
    }

    const inputOnKeyPressHandler = (e: any) => {
        if (e.target.id == 'email-input' && e.key == 'Enter' && emailValid) {
            setActiveElement("pwd-input");
        }
        
        if (e.target.id == 'pwd-input' && e.key == 'Enter' && pwdValid) {
            setActiveElement("username-input");
        }
        
        if (e.target.id == 'username-input' && e.key == 'Enter' && usernameValid) {
            setActiveElement("create-btn");
        }
    }
    return (
        <div className="content" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/signin_out/background1.jpg'})`}}>
            <nav id="signup-header">
                <Link to="/">
                    <div className="logoBox">
                        <img className="logo" src={process.env.PUBLIC_URL + '/logo.png'} alt=""/>
                    </div>
                </Link>
                <Link className="signin" to="/">
                    <span>Already have an account?</span> Sign in <BsArrowRight />
                </Link>
            </nav>
            <div id="signup-content">
                <TypeWriter
                    startDelay={0}
                    typingDelay={50}
                    erasingDelay={50}
                    newTextDelay={2000}
                    textArray={["Welcome to I.S.B"]}
                    loop={false}
                />
                <TypeWriter
                    startDelay={1000}
                    typingDelay={50}
                    erasingDelay={50}
                    newTextDelay={2000}
                    textArray={["Let's record our memories forever."]}
                    loop={false}
                />
                <div id="email-form" className={emailFormActive ? "show" : "hide"}>
                    <h4 className="signup-form-label">Enter your email</h4>
                    {activeElement == "email-input" ? <FaArrowRight className="fa-arrow-right"/> : emailValid ? <GoCheck className="go-check"/> : <GiCancel className="gi-cancel"/>}
                    <input id="email-input" ref={emailInput} className="signup-input" type="text" onFocus={() => setActiveElement("email-input")} onChange={(e)=>inputOnChangeHandler(e)} onKeyPress={inputOnKeyPressHandler} autoComplete="off"/>
                    <button disabled={!emailValid} className={classnames("signup-btn", {"btn-show": activeElement == "email-input", "btn-hide": activeElement != "email-input"})} onClick={()=> setActiveElement("pwd-input")}>continue</button>
                </div>
                <div id="pwd-form" className={pwdFormActive ? "show" : "hide"}>
                    <h4 className="signup-form-label">Create a password</h4>
                    {activeElement == "pwd-input" ? <FaArrowRight className="fa-arrow-right"/> : pwdValid ? <GoCheck className="go-check"/> : <GiCancel className="gi-cancel"/>}
                    <input id="pwd-input" ref={pwdInput} className="signup-input" type="password" onFocus={()=> setActiveElement("pwd-input")} onChange={(e)=>inputOnChangeHandler(e)} onKeyPress={inputOnKeyPressHandler} autoComplete="off"/>
                    <button disabled={!pwdValid} className={classnames("signup-btn", {"btn-show": activeElement == "pwd-input", "btn-hide": activeElement != "pwd-input"})} onClick={()=> setActiveElement("username-input")}>continue</button>
                </div>
                <div id="username-form" className={usernameFormActive ? "show" : "hide"}>
                    <h4 className="signup-form-label">Enter a username</h4>
                    {activeElement == "username-input" ? <FaArrowRight className="fa-arrow-right"/> : usernameValid ? <GoCheck className="go-check"/> : <GiCancel className="gi-cancel"/>}
                    <input id="username-input" ref={usernameInput} className="signup-input" type="text" onFocus={() => setActiveElement("username-input")} onChange={(e)=>inputOnChangeHandler(e)} onKeyPress={inputOnKeyPressHandler} autoComplete="off"/>
                    <button disabled={!usernameValid} className={classnames("signup-btn", {"btn-show": activeElement == "username-input", "btn-hide": activeElement != "username-input"})} onClick={()=> setActiveElement("create-btn")}>continue</button>
                </div>
                <Link id="create-btn" className={createBtnActive ? "show" : "hide"} to="/">
                    Create account
                </Link>
            </div>
        </div>
    )
}

export default Signup;