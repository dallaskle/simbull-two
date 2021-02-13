import React, {useEffect} from 'react'
import './Account.css'
import {Link} from 'react-router-dom'
import {auth, firebaseAnalytics} from '../../services/firebase'

const Account = (props) => {
    const user = props.user

    const logOut = () => {
        auth.signOut()
    }

    useEffect(()=>{
        firebaseAnalytics.logEvent("settings_visit", {
           user: user && user.email 
        })
    },[])

    return(
        <div className="Account">
            <Link to='/Account' onClick={props.closeBar}><div className="a-item">My Account</div></Link>
            <Link to='/Transfers' onClick={props.closeBar}><div className="a-item">Cash Transfers</div></Link>
            <Link to='/Subscription' onClick={props.closeBar}><div className="a-item">Subscription</div></Link>
            <Link to='/Referrals' onClick={props.closeBar}><div className="a-item">Referrals</div></Link>
            <Link to='/Notifications' onClick={props.closeBar}><div className="a-item">Notifications</div></Link>
            <hr />
            <Link to='/Tutorials' onClick={props.closeBar}><div className="a-item">Tutorials</div></Link>
            <Link to='/FAQ' onClick={props.closeBar}><div className="a-item">FAQs</div></Link>
            <Link to='/Contact-Us' onClick={props.closeBar}><div className="a-item">Contact Us</div></Link>
            <Link to='/GiveReview' onClick={props.closeBar}><div className="a-item">Give Us a Review</div></Link>
            <Link to='/TermsOfUse' onClick={props.closeBar}><div className="a-item">Terms of Service</div></Link>
            <Link to='/Privacy' onClick={props.closeBar}><div className="a-item">Privacy Policy</div></Link>
            <hr />
            <button onClick={logOut} className="a-item a-btn">Log out</button>
            <br />
            <br />
        </div>
    )
}

export default Account