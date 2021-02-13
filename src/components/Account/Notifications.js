import React from 'react'
import './Account.css'
import Header from './Header'
import {Link} from 'react-router-dom'

const Notifications = (props) => {
    //props
    const user = props.user

    return(
        <>
        
        <div className="Notifications DesktopContainer">
            <div className='notifications-div'>
                <div className='notifications-head'>Notifications</div>
                <div className='notifications-body'>
                    Control your notification preferences
                </div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Trades</div>
                <div className="notifications-right">{user.notiTrades ? user.notiTrades : 'Yes'}</div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Bids/Asks Executed</div>
                <div className="notifications-right">{user.notiOffers ? user.notiOffers : 'Yes'}</div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Deposits</div>
                <div className="notifications-right">{user.notiDeposits ? user.notiDeposits : 'Yes'}</div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">SimBull's Weekly Newsletter</div>
                <div className="notifications-right">{user.notiWeekly ? user.notiWeekly : 'Yes'}</div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Important SimBull Changes</div>
                <div className="notifications-right">Yes</div>
            </div>
            <div className='ua-edit-div'><Link to='/EditNotifications'>Edit</Link></div>
        </div>
        </>
    )
}

export default Notifications