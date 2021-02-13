import React from 'react'
import './landingpage.css'
import logo from '../assets/Logo-orig.png'
import {Link} from 'react-router-dom'

const Footer = () => {
    return(
        <div className="Footer">
            <div className="f-div1">
                <div className="f-img-div"><img className="f-img" src={logo} alt='logo' /></div>
                <div className="f-div-about">SimBull has created a stock market for sports, where you can trade teams like stocks and earn win payouts.</div>
                <div className="f-div-address">Minneapolis, Minnesota, USA</div>
            </div>
            <div className="f-div">
                <div className="f-div-head">How To Play</div>
                <Link to='/Gettings-Started'><div className="f-div-item">Getting Started</div></Link>
                <Link to='/FAQs'><div className="f-div-item">FAQs</div></Link>
                <Link to='/Can-I-Make-Money'><div className="f-div-item">Can I Make Money?</div></Link>
            </div>
            <div className="f-div">
                <div className="f-div-head">About Us</div>
                <Link to='/Our-Story'><div className="f-div-item">Our Story</div></Link>
                <Link to='/ContactUs'><div className="f-div-item">Contact Us</div></Link>
                <Link to='/Terms-Of-Use'><div className="f-div-item">Terms Of Use</div></Link>
                <Link to='/Privacy-Policy'><div className="f-div-item">Privacy Policy</div></Link>
            </div>
            <div className="f-div">
                <div className="f-div-head">Follow Us</div>
                <div className="f-icon-div">
                    <div className="f-icon"><a href="https://www.facebook.com" aria-label="icon" alt='facebook' className="fa fa-facebook"></a></div>
                    <div className="f-icon"><a href="https://www.twitter.com" aria-label="icon" alt='twitter' className="fa fa-twitter"></a></div>
                    <div className="f-icon"><a href="https://www.instagram.com" aria-label="icon" alt='instagram' className="fa fa-instagram"></a></div>
                    <div className="f-icon"><a href="https://www.linkedin.com" aria-label="icon" alt='linkedin' className="fa fa-linkedin"></a></div>
                </div>
            </div>
            <hr />
            <div className="f-copyright">Copyright 2020 SimBull Sports Exchange All Rights Reserved</div>
        </div>
    )
}

export default Footer
