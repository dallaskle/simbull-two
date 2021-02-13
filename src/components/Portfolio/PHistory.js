import React, {useState} from 'react'
import './portfolio.css'
import {Link} from 'react-router-dom'
import TradeHistory from './Histories/TradeHistory'
import TransferHistory from './Histories/TransferHistory'
import WinPayoutHistory from './Histories/WinPayoutHistory'

const PHistory = (props) => {
    const user = props.user

    const [showTransfer, setShowTransfer] = useState(false)
    const [showTrade, setShowTrade] = useState(false)
    const [showPayouts, setShowPayouts] = useState(false)

    return(
        <div className="PHistory">
            <Link onClick={()=>{setShowTransfer(!showTransfer)}}>
            <div className={showTransfer ? "p-history p-selected" : "p-history"}>
                <div className="p-history-icon-div"></div> 
                <div className="p-history-title">Transfer History</div>
                <div className="p-history-icon-div"><i className={showTransfer ? "fa fa-angle-up" : "fa fa-angle-down"}></i></div> 
            </div>
            </Link>
            <div className={showTransfer ? "gray-back" : ''}>
                {showTransfer && <TransferHistory user={props.user} />}
            </div>
            <hr className='p-history-hr' />
            
            <Link onClick={()=>{setShowTrade(!showTrade)}}>
            <div className={showTrade ? "p-history p-selected" : "p-history"}>
                <div className="p-history-icon-div"></div> 
                <div className="p-history-title">Trade History</div>
                <div className="p-history-icon-div"><i className={showTrade ? "fa fa-angle-up" : "fa fa-angle-down"}></i></div> 
            </div>
            </Link>
            <div className={showTrade ? "gray-back" : ''}>
                {showTrade && <TradeHistory user={props.user} />}
            </div>
            <hr className='p-history-hr' />
            <Link onClick={()=>{setShowPayouts(!showPayouts)}}>
            <div className={showPayouts ? "p-history p-selected" : "p-history"}>
                <div className="p-history-icon-div"></div> 
                <div className="p-history-title">Win Payout History (${((user.nbaPayouts * .1)+(user.nflPayouts * .5)).toFixed(2)})</div>
                <div className="p-history-icon-div"><i className={showPayouts ? "fa fa-angle-up" : "fa fa-angle-down"}></i></div> 
            </div>
            </Link>
            <div className={showPayouts ? "gray-back" : ''}>
                {showPayouts && <WinPayoutHistory user={props.user} />}
            </div>
            <hr className='p-history-hr' />
        </div>
    )
}

export default PHistory