import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { AiFillCaretDown } from 'react-icons/ai';
import { useDetectOutsideClick } from '@components/header/useDetectOutsideClick';
import '@components/header/Header.css'

function Header(): JSX.Element {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    return (
        <nav className="header" style={{height: "50px"}}>
            <Link to="/">
                <div className="logoBox">
                    <img className="logo" src={process.env.PUBLIC_URL + '/logo.png'} alt=""/>
                </div>
            </Link>
            <Link className="headerMenu" to="/">
                <button className="menu-trigger">
                    <span>Why Love Chain?</span>
                </button>
            </Link>
            <Link className="headerMenu" to="/aboutus">
                <button className="menu-trigger">
                    <span>About us</span>
                </button>
            </Link>
            <div className="headerMenu">
                <button onClick={onClick} className="menu-trigger">
                    <span>Explore <AiFillCaretDown /> </span>
                </button>
                <nav
                    ref={dropdownRef}
                    className={`menu ${isActive ? "active" : "inactive"}`}
                >
                    <ul>
                        <li className="dropMenuTitle">Theme</li>
                        <li className="dropMenuSub"><Link to="#">Locks of Love</Link></li>
                        <li className="dropMenuSub"><Link to="#">Last Will</Link></li>
                        <li className="dropMenuSub"><Link to="#">What you want to say anything...</Link></li>
                    </ul>
                </nav>
            </div>
            <Link className="headerMenu" to="/">
                <button className="menu-trigger">
                    <span>Pricing</span>
                </button>
            </Link>
            <Link className="headerMenu" to="/">
                <button className="menu-trigger">
                    <span>How to join?</span>
                </button>
            </Link>

        </nav>
    )
}

export default Header
