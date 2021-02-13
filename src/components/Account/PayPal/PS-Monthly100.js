import React, {useContext} from 'react';
import PayPalBtn3 from './PayPalBtn3'
import moment from 'moment'
import {db} from '../../../services/firebase'
import firebase from 'firebase'

let user = ''

const paypalSubscribe = (data, actions) => {
  return actions.subscription.create({
    'plan_id': "P-76330725UB0932742L6NM5TA",
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
    amount: 100,
    date: date,
    type: 'reocurring'
  })
  db.collection('Users').doc(user.email).update({
    cash: firebase.firestore.FieldValue.increment(100),
    currentMoneyDeposited: firebase.firestore.FieldValue.increment(100),
    totalValue: firebase.firestore.FieldValue.increment(100)
  }).then((result) => {
    alert('Deposit Successful! The funds will appear in the portfolio after the page is refreshed.')
    return window.location.href = "https://simbull.app";
  })
};


function PsMonthly100(props) {
  user = props.user
  return (
    <div className="App">
              <span className="paypal-subscription-amount">Monthly $100</span>
              <PayPalBtn3
                amount = "100"
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

export default PsMonthly100;