import React, {useContext} from 'react';
import PayPalBtn1 from './PayPalBtn1'
import moment from 'moment'
import {db} from '../../../services/firebase'
import firebase from 'firebase'

let user = ''

const paypalSubscribe = (data, actions) => {
  return actions.subscription.create({
    'plan_id': "P-4LB12660DG0426532L6CLGZQ",
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
    amount: 25,
    date: date,
    type: 'reocurring'
  })
  db.collection('Users').doc(user.email).update({
    cash: firebase.firestore.FieldValue.increment(25),
    currentMoneyDeposited: firebase.firestore.FieldValue.increment(25),
    totalValue: firebase.firestore.FieldValue.increment(25)
  }).then((result) => {
    alert('Deposit Successful! The funds will appear in the portfolio after the page is refreshed.')
    return window.location.href = "https://simbull.app";
  })
};


function PsWeekly25(props) {
  user = props.user
  return (
    <div className="App">
      <span className="paypal-subscription-amount">Weekly $25</span>
              <PayPalBtn1
                amount = "25"
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

export default PsWeekly25;