import React from 'react'
import './Account.css'
import Header from './Header'
import {db} from '../../services/firebase'
import firebase from 'firebase'

const RequestPennant = (props) => {
    //props
    const user = props.user

    //Functionality
    const requestPennant = () => {
        let answer = window.confirm(`Are you sure you want to forfeit your share for your pennant?`)
        if(answer){
            db.collection('PayoutRequests').doc(`Pennant-${user.email}-${document.getElementById('requestPennant').value}`).set({
                share: document.getElementById('requestPennant').value,
                user: user.email,
                date: firebase.firestore.Timestamp.now(),
                type: 'pennant'
            }).then(res => alert(`You have requested ${document.getElementById('requestPennant').value} pennant to be delivered to you. We will confirm your address by email within 24 hours.`))
        }
    }

    return(
        <>
        
        <div className="RequestPennant DesktopContainer">
            <div className='rp-div'>
                <div className='rp-head'>Request Pennant</div>
                <br />
                <span>Want to touch and hold your pennant? Request the team's pennant you would like and we will deliver it. We will confirm your address by email.</span>
                <div>When we ship your pennant to you, you will lose the opportunites for future win payouts and your virtual team share.</div>
                <div className='rp-body'>
                    {user.shares.length > 0 ? <>
                        <div className='rp-cash'>Select the Pennant you want to receive</div>
                        <select id='requestPennant' className="rp-input">
                            {user.shares.map(s => {
                                return(
                                    <option className="rp-option" value={s}>{s}</option>
                                )
                            })}
                        </select>
                            <br />
                            <button onClick={requestPennant} className="rp-btn">Request Pennant</button>
                    </> : <div><hr />You don't currently own any shares. Please buy a share before requesting your pennant.<hr /></div>}
                </div>
            </div>
        </div>
        </>
    )
}

export default RequestPennant