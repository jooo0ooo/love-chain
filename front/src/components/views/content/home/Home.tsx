import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { GiClick } from "react-icons/gi";
import './Home.css'

function Home() {
    return (
        <div className="content" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/mainpage/background4.jpg'})`}}>
            <Header/>
            <div className="contentBody">
                <h1 className="contentTitle">Immutable Signature<br/>on Blockchain</h1>
                <h3 className="contentSubTitle">Your love that won't change, your last will for your family, what you want to say to the world...<br/>Leave your message that you want to record anything forever.</h3>
                <Link to="/theme/choose">
                    <button className="goService">Leave your Message! <GiClick /></button>
                </Link>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;