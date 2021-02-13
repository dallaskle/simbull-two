import React, {useContext} from 'react';
import PayPalBtn2 from './PayPalBtn2'
import moment from 'moment'
import {db} from '../../../services/firebase'
import firebase from 'firebase'

let user = ''

const paypalSubscribe = (data, actions) => {
  return actions.subscription.create({
    'plan_id': "P-4N172726DT148104AL6NM56Y",
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
    amount: 250,
    date: date,
    type: 'reocurring'
  })
  db.collection('Users').doc(user.email).update({
    cash: firebase.firestore.FieldValue.increment(250),
    currentMoneyDeposited: firebase.firestore.FieldValue.increment(250),
    totalValue: firebase.firestore.FieldValue.increment(250)
  }).then((result) => {
    alert('Deposit Successful! The funds will appear in the portfolio after the page is refreshed.')
    return window.location.href = "https://simbull.app";
  })
};


function PsMonthly250(props) {
  user = props.user
  return (
    <div className="App">
      <span className="paypal-subscription-amount">Monthly $250</span>
              <PayPalBtn2
                amount = "250"
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

export default PsMonthly250;