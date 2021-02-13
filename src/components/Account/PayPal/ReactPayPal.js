import React, { useState, useEffect } from "react";
//import '../Acount.css'
import firebase from 'firebase'
import {db} from '../../../services/firebase'
import moment from 'moment'

export default function ReactPayPal(props) {
  const user = props.user
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [minAmt, setMinAmt] = useState()
  const paypalRef = React.useRef();
  const [dbDeposit, setdbDeposit] = useState(false)
  const [bonusAmt, setBonusAmt] = useState(0)
  const [neededAmt, setNeededAmt] = useState(0)
  const [promoTxt, setPromoTxt] = useState('')

  let depositValue 

   // To show PayPal buttons once the component loads
   React.useEffect(() => {
    window.paypal
    .Buttons({
      createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `SimBull Cash for user: ${user.email}`,
                amount: {
                  currency_code: "USD",
                  value: props.amount
                }
              }
            ]
          });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        setPaid(true);
        console.log(order);
      },
      onError: (err) => {
        //   setError(err),
        console.error(err);
      }
    })
    .render(paypalRef.current);
  
  
}, []);

  useEffect(() => {
    if(props.promo !== undefined){
      db.collection('Affiliates').doc(props.promo ? props.promo : 'nothing').get(doc => {
        if(doc.exists){
          const data = doc.data()
          setBonusAmt(parseFloat(data.bonus))
          setNeededAmt(parseFloat(data.needed))
          setPromoTxt(data.bonusTxt)
        }
      })
    }
  }, [props.promo])


  // If the payment has been made
  if (paid) {
    console.log(1)
    let date = moment().format('MMMM Do YYYY, h:mm:ss a')
    if(!dbDeposit){
      console.log(2)
      setdbDeposit(true)
      let amount = parseFloat(props.amount)
      let pBonus = 0
      if(amount >= neededAmt && user.currentMoneyDeposited === 0){pBonus = bonusAmt}
      let dBonus = 0
      if(props.promo.toLowerCase() === "deposit10" && user.currentMoneyDeposited === 0){pBonus = 10}
      if(props.promo.toLowerCase() === "deposit20" && user.currentMoneyDeposited === 0){pBonus = 20}
      if(amount >= 10){
        console.log(3)
        db.collection('Deposits').doc(`${date}-${user.email}`).set({
          user: user.email,
          amount: amount,
          date: date,
          bonus: pBonus + dBonus,
          type: 'deposit',
          userCode: user.code ? user.code : null,
          depositNum: user.currentMoneyDeposited === 0 ? 'first' : 'multiple'
        })
        db.collection('Users').doc(user.email).update({
          cash: firebase.firestore.FieldValue.increment(amount + pBonus + dBonus),
          currentMoneyDeposited: firebase.firestore.FieldValue.increment(amount),
          totalValue: firebase.firestore.FieldValue.increment(amount + pBonus + dBonus),
          bonusesReceived: firebase.firestore.FieldValue.increment(pBonus + dBonus)
        }).then((result) => {
          alert(`Deposit Successful! The funds will appear in the portfolio after the page is refreshed.`)
          return window.location.href = "https://simbull.app";
        })
      }else{ 
          db.collection('Deposits').doc(`${date}-${user.email}`).set({
            user: user.email,
            amount: amount,
            date: date,
            bonus: pBonus,
            type: 'deposit'
          })
          db.collection('Users').doc(user.email).update({
            cash: firebase.firestore.FieldValue.increment(amount + pBonus),
            currentMoneyDeposited: firebase.firestore.FieldValue.increment(amount + pBonus),
            totalValue: firebase.firestore.FieldValue.increment(amount + pBonus),
          }).then((result) => {
            alert(`Deposit Successful! The funds will appear in the portfolio after the page is refreshed.`)
            return window.location.href = "https://simbull.app";
          })
        }  
      
    }
    return <div>Deposit Successful! The funds will appear in the portfolio after the page is refreshed.</div>;
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment! Please try again.</div>;
  }

  // Default Render
  return (
    <div className="Transfer-Paypal-Sheet">
                    <div className="Transfer-Paypal-Sheet-Div">
                      <div className="Transfer-Paypal-Sheet-Title">Deposit</div>
                        <div className="Transfer-Paypal-Sheet-Amount-txt">
                          Amount: 
                        </div>
                        <div className="Transfer-Paypal-Sheet-Amount"><br></br>${props.amount}</div><hr />
                        {props.promo && <>
                          <div className="Transfer-Paypal-Sheet-Amount-txt">
                            Promo: 
                          </div>
                          <div className="Transfer-Paypal-Sheet-Amount"><br></br>{props.promo}</div>
                          <div className="Transfer-Paypal-Sheet-Amount-txt">
                            {promoTxt} 
                          </div>
                          <hr />
                        </>}
                        <p>Click the Payment Option You Prefer</p>
                        <div ref={paypalRef} />
                    </div>
    </div>
  );
}

