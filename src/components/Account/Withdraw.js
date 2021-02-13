import React, {useState} from 'react'
import { db } from '../../services/firebase'
import './Account.css'
import Header from './Header'
import moment from 'moment'

const Withdraw = (props) => {
    //props
    const user = props.user

    //states
    const [amount, setAmount] = useState(0)
    const [paypalEmail, setPaypalEmail] = useState(user.email)
    const [text, setText] = useState()

    //Functionality
    const submitWithdraw = () => {
        let answer = window.confirm(`Are you sure you want to withdraw $${amount}? We think you should buy some shares with it ;)`)
        if(answer){
            let today = moment().format('YYYYMMDD')
            db.collection('PayoutRequests').doc(`${today}-Cash-${user.email}-${amount}`).set({
                user: user.email,
                amount: amount,
                paypalEmail: paypalEmail,
                text: text,
                type: 'cash',
                completed: false
            }).then(res => {
                alert(`You will receive your cash ($${amount}) through Paypal to ${paypalEmail} within 24 hours.`)
            })
        }
    }

    return(
        <>
        
        <div className="Withdraw DesktopContainer">
            <div className='withdraw-div'>
                <div className='withdraw-head'>Withdraw</div>
                <span>Payout will be sent within 48 hours and be processed by PayPal.</span>
                <div className='withdraw-body'>
                <div>Please enter the your PayPal email:<br /><input className="withdraw-body-input" value={paypalEmail} onChange={(e)=>{setPaypalEmail(e.target.value)}} /></div><br />
                <div className='withdraw-cash'>Cash Availble: ${user.cash && user.cash.toFixed(2)}</div>
                    <input className="withdraw-input" value={amount} onChange={(e)=>{setAmount(e.target.value)}} />
                    <br />
                    <div>Please tell us why you want to withdraw</div>
                    <textarea className="withdraw-textarea" value={text} onChange={(e)=>{setText(e.target.value)}} />
                    <br />
                    <button onClick={submitWithdraw} className="withdraw-btn">Withdraw</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Withdraw