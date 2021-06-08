import React from 'react'
import { Link } from 'react-router-dom';
import { GiClick } from "react-icons/gi";
import Header from '../../header/Header';
import './Love.css'

function Love() {
    return (
        <div style={{height: "100%"}}>
            <Header/>
            <div className="content" style={{height: "90%"}}>
                <div style={{height: "70%"}}>
                    <div style={{width: "60%", float: "left"}}>
                        left
                    </div>
                    <div style={{width: "40%", float: "left"}}>
                        right
                    </div>
                </div>
                <div style={{height: "30%"}}>
                    bottom
                </div>
            </div>
        </div>
    )
}

export default Love;