import React from 'react'
import { Link } from 'react-router-dom';
import { GiClick } from "react-icons/gi";
import './Theme.css'

function Theme() {
    return (
        <div className="content">
            <Link to="/theme/love">
                <div className="section loveLockSection" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/theme/love.jpg'})`}}>
                    <div className="sectionUpper"></div>
                    <div className="sectionTitle">Love... <GiClick /></div>
                </div>
            </Link>
            <Link to="/theme/last_will">
                <div className="section lastWillSection" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/theme/lastwill.jpg'})`}}>
                    <div className="sectionUpper"></div>
                    <div className="sectionTitle" style={{color: "white"}}>Last Will... <GiClick /></div>
                </div>
            </Link>
            <Link to="/theme/anything">
                <div className="section anythingSection" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/theme/anything.jpg'})`}}>
                    <div className="sectionUpper"></div>
                    <div className="sectionTitle">Anything... <GiClick /></div>
                </div>
            </Link>
        </div>
    )
}

export default Theme
