import React from 'react'
import './Account.css'
import Header from './Header'
import {Link} from 'react-router-dom'
import { db } from '../../services/firebase'

const EditNotifications = (props) => {
    //props
    const user = props.user

    //Functionality
    const updateNotifications = () => {
        db.collection('Users').doc(user.email).update({
            notiTrades: document.getElementById('trades').value,
            notiOffers: document.getElementById('offers').value,
            notiDeposits: document.getElementById('deposits').value,
            notiWeekly: document.getElementById('newsletter').value,
        }).then(res => {
            props.history.goBack()
            return window.location.href="https://simbull.app/Notifications"
        })
    }

    return(
        <>
        
        <div className="Notifications DesktopContainer">
            <div className='notifications-div'>
                <div className='notifications-head'>Edit Notifications</div>
                <div className='notifications-body'>
                    Control your notification preferences
                </div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Trades</div>
                <div className="notifications-right">
                    <select name='trades' id='trades'>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </select>
                </div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Bids/Asks Executed</div>
                <div className="notifications-right">
                    <select name='offers' id='offers'>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </select>
                </div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Deposits</div>
                <div className="notifications-right">
                    <select name='deposits' id='deposits'>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </select>
                </div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">SimBull's Weekly Newsletter</div>
                <div className="notifications-right">
                    <select name='newsletter' id='newsletter'>
                        <option value='Yes'>Yes</option>
                        <option value='No'>No</option>
                    </select>
                </div>
            </div>
            <div className="notifications-item">
                <div className="notifications-left">Important SimBull Changes</div>
                <div className="notifications-right">Yes</div>
            </div>
            <div className='ua-edit-div'><Link onClick={updateNotifications}>Submit</Link></div>
        </div>
        </>
    )
}

export default EditNotifications