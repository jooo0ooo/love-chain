import React from 'react'
import { Link } from 'react-router-dom';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import { GiClick } from "react-icons/gi";
import '@pages/home/Home.css'
import { FaCentercode } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="content" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/mainpage/background0.jpeg'})`, backgroundPosition: 'center'}}>
            <Header/>
            <div className="contentBody">
                <h1 className="contentTitle">Love Chain</h1>
                <h3 className="contentSubTitle">Your love that won&apos;t change, your last will for your family, what you want to say to the world...<br/>Leave your message that you want to record anything forever.</h3>
                <Link to="/theme/choose">
                    <button className="goService">Leave your Message! <GiClick /></button>
                </Link>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;