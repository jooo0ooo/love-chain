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
                    <div style={{width: "60%", height: "100%", float: "left", backgroundColor: "red"}}>
                        left
                    </div>
                    <div style={{width: "40%", height: "100%", float: "left", backgroundColor: "blue"}}>
                        right
                    </div>
                </div>
                <div style={{height: "30%", backgroundColor: "green"}}>
                    bottom
                </div>
            </div>
        </div>
    )
}

export default Love;