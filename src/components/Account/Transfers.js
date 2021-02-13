import React, {useState} from 'react'
import './Account.css'
import Header from './Header'
import {Link} from 'react-router-dom'
import ReactPayPal from './PayPal/ReactPayPal'
import PsWeekly25 from './PayPal/PS-Weekly25'
import PsWeekly10 from './PayPal/PS-Weekly10'
import PsMonthly250 from './PayPal/PS-Monthly250'
import PsMonthly100 from './PayPal/PS-Monthly100'

const Transfers = (props) => {
    //props
    const user = props.user

    //states
    const [amount, setAmount] = useState()
    const [promo, setPromo] = useState(user.code ? user.code : '')
    const [checkout, setCheckout] = useState(false)

    return(
        <>
        
        
        {checkout === true ? (
              <div className="payment-div DesktopContainer">
                <ReactPayPal promo={user.code && user.currentMoneyDeposited === 0 ? user.code : promo} amount={amount} user={user} />
              </div>
            ) : (
                    <>
                        <div className="Transfers DesktopContainer">
                        <div className='transfer-deposit'>
                            <div className='transfer-deposit-head'>One-Time Deposit</div>
                            <span>Your account will be credited immediately. Payments are processed by PayPal or Credit/Debit Card.</span>
                            <div className='transfer-deposit-body'>
                                Amount:<br /><input className="transfer-deposit-input" onChange={(e)=>{setAmount(e.target.value)}} placeholder='$' />
                                <br />
                                Promo:<br /> <input className="transfer-promo-input" onChange={(e)=>{setPromo(e.target.value)}} value={promo} />
                                <br />
                                <button className="transfer-depsoit-btn" onClick={()=>{if(amount < 10 || amount === undefined){alert('$10 minimum')}else{setCheckout(true)}}}>Continue to Deposit</button>
                            </div>
                        </div>
                        <div className='transfer-deposit'>
                            <div className='transfer-deposit-head'>Start a Reocurring Deposit</div>
                            <div className='transfer-deposit-body'>
                                <PsWeekly10 user={user} />
                                <hr />
                                <PsWeekly25 user={user} />
                                <hr />
                                <PsMonthly100 user={user} />
                                <hr />
                                <PsMonthly250 user={user} />
                                <hr />
                            </div>
                        </div>
                        <Link to ='/Withdraw'><div className='transfer-div'>Withdraw</div></Link>
                        <Link to ='/RequestPennant'><div className='transfer-div'>Request your Pennant</div></Link>
                        </div>
                    </>
            )}
        </>
    )
}

export default Transfers