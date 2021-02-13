import { PayPalButton } from "react-paypal-button-v2";
import React from 'react';

export function PayPalBtn2(props) {
  const { amount, currency, createSubscription, onApprove, catchError,onError, onCancel} = props;
  const paypalKey = "Abs1nhbO9RnoxfJdKHOaSEJdU22l836957p94JDViTWBo_AyUCs_I4XUXxTbJsmrRkztBemol2bQkBxO"
  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      createSubscription={(data, details) => createSubscription(data, details)}
      onApprove={(data, details) => onApprove(data, details)}
      onError={(err) => onError(err)}
      catchError={(err) => catchError(err)}
      onCancel={(err) => onCancel(err)}
      options={{
        clientId: paypalKey,
        vault:true
      }}
      style={{
        shape: 'rect',
        color: 'black',
        layout: 'horizontal',
        label: 'subscribe',
      }}
    />
  );
}

export default PayPalBtn2;


