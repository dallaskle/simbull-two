import React from 'react'
import './Account.css'
import Header from './Header'
import {db} from '../../services/firebase'
import firebase from 'firebase'

const Subscription = (props) => {
    //props
    const user = props.user

    const subscriptionCost = 20

    //Functionality
    const buySubscription = () => {
        if(user.cash >= subscriptionCost){
            let answer = window.confirm(`Confirm you want to buy a subscription. You will get free trading with a subscription. This will take $${subscriptionCost} from your SimBull Account.`)
            if(answer){
                db.collection('Users').doc(user.email).update({
                    cash: firebase.firestore.FieldValue.increment(-subscriptionCost),
                    subscription: true,
                    subscriptionDate: firebase.firestore.Timestamp.now()
                }).then(res => alert(`Congrats! Your subscription is purchased. You now will get free trading!`))
            }
        }else{
            alert(`You only have $${user.cash} and a subscription costs $${subscriptionCost}`)
        }
    }

    return(
        <>
        
        <div className="Subscription DesktopContainer">
            <div className='subscription-div'>
                <div className='subscription-head'>Subscription</div>
                <span>Free Trading when you own a subscription. Avoid the $1 Trading Fee. The subscription is good for both the NBA and NFL season.</span>
                <div className='subscription-body'>
                    <div>Price: ${subscriptionCost}</div>
                    <button onClick={buySubscription} className="subscription-btn">Buy Subscription</button>
                    {user.subscription && <><br /><br /><br /><div>You own a subscription.</div></>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Subscription