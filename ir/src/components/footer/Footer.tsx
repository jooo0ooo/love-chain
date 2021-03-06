import React from 'react'
import '@components/footer/Footer.css'

function Footer(): JSX.Element {
    return (
        <div className="footer">
            <div className="footerElement">
                <span className="footerInfo">
                    65+ million
                </span>
                <br/>
                <span className="footerInfoSup">
                    Users
                </span>
            </div>
            <div className="footerElement">
                <span className="footerInfo">
                    50+ million
                </span>
                <br/>
                <span className="footerInfoSup">
                    Number of users more than once
                </span>
            </div>
            <div className="footerElement">
                <span className="footerInfo">
                    350+ million
                </span>
                <br/>
                <span className="footerInfoSup">
                    Posts
                </span>
            </div>
            <div className="footerElement">
                <span className="footerInfo">
                    98%
                </span>
                <br/>
                <span className="footerInfoSup">
                    Average satisfaction
                </span>
            </div>
        </div>
    )
}

export default Footer
