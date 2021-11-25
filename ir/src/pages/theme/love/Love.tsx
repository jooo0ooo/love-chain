import React from 'react'
import Header from '@components/header/Header';
import '@pages/theme/love/Love.css'

function Love(): JSX.Element {
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