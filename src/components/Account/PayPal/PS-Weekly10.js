import React, {useContext} from 'react';
import PayPalBtn from './PayPalBtn'
import moment from 'moment'
import {db} from '../../../services/firebase'
import firebase from 'firebase'

let user = ''

const paypalSubscribe = (data, actions) => {
  return actions.subscription.create({
    'plan_id': "P-14634335UP026414AL6NM4RA",
  });
};

const paypalOnError = (err) => {
  alert('Error! Please try again.')
}

const paypalOnApprove = (data, detail) => {
  console.log("Paypal approved")
  let date = moment().format('MMMM Do YYYY, h:mm:ss a')
  db.collection('Deposits').doc(`${date}-${user.email}`).set({
    user: user.email,
    amount: 10,
    date: date,
    type: 'reocurring'
  })
  db.collection('Users').doc(user.email).update({
    cash: firebase.firestore.FieldValue.increment(10),
    currentMoneyDeposited: firebase.firestore.FieldValue.increment(10),
    totalValue: firebase.firestore.FieldValue.increment(10)
  }).then((result) => {
    alert('Deposit Successful! The funds will appear in the portfolio after the page is refreshed.')
    return window.location.href = "https://simbull.app";
  })
};


function PsWeekly10(props) {
  user = props.user
  return (
    <div className="App">
      <span className="paypal-subscription-amount">Weekly $10</span>
              <PayPalBtn
                amount = "10"
                currency = "USD"
                createSubscription={paypalSubscribe}
                onApprove={paypalOnApprove}
                catchError={paypalOnError}
                onError={paypalOnError}
                onCancel={paypalOnError}
            />
    </div>
  );
}

export default PsWeekly10;