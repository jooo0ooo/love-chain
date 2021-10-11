import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { BsArrowRight } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { GoCheck } from "react-icons/go";
import classnames from 'classnames';
import TypeWriter from "@components/typeWriter/TypeWriter";
import { isValidEmail, isValidPwd, isValidUsername, sleep } from '@utils/Utils';
import '@pages/signup/Signup.css';
import { inputList } from '@pages/signup/InputList';
import { customAxios } from '@src/utils/CustomAxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = (): JSX.Element => {
    const [emailFormActive, setEmailFormActive] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const [pwdFormActive, setPwdFormActive] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);

    const [usernameFormActive, setUsernameFormActive] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);

    const [createBtnActive, setCreateBtnActive] = useState(false);
    const [activeElement, setActiveElement] = useState("");

    const [errMsgContent, setErrMsgContent] = useState("");

    const emailInput = useRef<HTMLInputElement>(null);
    const pwdInput = useRef<HTMLInputElement>(null);
    const usernameInput = useRef<HTMLInputElement>(null);

    const history = useHistory();

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

    const inputOnChangeHandler = async (e: any) => {
        if (e.target.id == 'email-input') {
            if (await isValidEmail(e.target.value).then((result) => {return result;})) {
                setEmailValid(true);
                setErrMsgContent("");
            } else {
                setEmailValid(false);
                setErrMsgContent("Email is invalid or already taken");
            }
        }

        if (e.target.id == 'pwd-input') {
            if (isValidPwd(e.target.value)) {
                setPwdValid(true);
                setErrMsgContent("");
            } else {
                setPwdValid(false);
                setErrMsgContent("Password must be at least 8 characters including numbers, lowercase letters and special symbols.");
            }
        }

        if (e.target.id == 'username-input') {
            if (await isValidUsername(e.target.value).then((result) => {return result;})) {
                setUsernameValid(true);
                setErrMsgContent("");
            } else {
                setUsernameValid(false);
                setErrMsgContent("Username " + e.target.value + " is invalid or already taken. Username may only contain alphanumeric characters, underscore or hyphen and cannot begin with a special symbols and numbers and cannot end with a special symbols.");
            }
        }
    }

    const processSignup = async () => {
        const email = emailInput.current?.value,
            password = pwdInput.current?.value,
            username = usernameInput.current?.value;
            
        const res = await customAxios.post('/signup', {email, password, username});
        if (res.data.message == 'success') {
            history.push("/signin");
        } else {
            toast.error(<div>Sign up Failed!<br/>Check your input data</div>);
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

    const signupContetn = inputList.map(({formType, title}, key) => 
        <div className="signup-content-wrap" key={key}>
            <div id={formType + "-form"} className={(formType == 'email' ? emailFormActive : formType == 'pwd' ? pwdFormActive : usernameFormActive) ? "show" : "hide"}>
                <h4 className="signup-form-label">{title}</h4>
                {
                    activeElement == formType + "-input"
                        ? <FaArrowRight className="fa-arrow-right"/> 
                        : emailValid 
                            ? <GoCheck className="go-check"/> 
                            : <GiCancel className="gi-cancel"/>
                }
                <input id={formType + "-input"} 
                    className="signup-input" 
                    type={formType == "pwd" ? "password" : "text"} 
                    ref={formType == "email" ? emailInput : formType == "pwd" ? pwdInput : usernameInput} 
                    onFocus={() => setActiveElement(formType + "-input")} 
                    onChange={(e)=>inputOnChangeHandler(e)} 
                    onKeyPress={inputOnKeyPressHandler} 
                    autoComplete="off"/>
                <button 
                    disabled={formType == "email" ? !emailValid : formType == "pwd" ? !pwdValid : !usernameValid} 
                    className={
                        classnames("signup-btn", 
                            {
                                "btn-show": activeElement == formType + "-input", 
                                "btn-hide": activeElement != formType + "-input"
                            }
                        )} 
                    onClick={()=> setActiveElement(formType == "email" ?  "pwd-input" : formType == "pwd" ? "username-input" : "create-btn")}
                >continue</button>
            </div>
        </div>
    );

    return (
        <div className="content" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/signin_out/background1.jpg'})`}}>
            <nav id="signup-header">
                <Link to="/">
                    <div className="logoBox">
                        <img className="logo" src={process.env.PUBLIC_URL + '/logo.png'} alt=""/>
                    </div>
                </Link>
                <Link className="signin" to="/signin">
                    <span>Already have an account?</span> Sign in <BsArrowRight />
                </Link>
            </nav>
            <div id="signup-content">
                <TypeWriter
                    startDelay={0}
                    typingDelay={50}
                    erasingDelay={50}
                    newTextDelay={2000}
                    textArray={["Welcome to Love Chain"]}
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
                {signupContetn}
                <div 
                    id="create-btn" 
                    className={createBtnActive ? "show" : "hide"} 
                    onClick={processSignup}
                >
                    Create account
                </div>
                <ToastContainer />
            </div>
            <div id="signup-err-msg">
                <span>{errMsgContent}</span>
            </div>
        </div>
    )
}

export default Signup;