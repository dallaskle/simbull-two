import React from 'react'
import './portfolio.css'
import {Link} from 'react-router-dom'

const PTransfer = (props) => {
    const user = props.user

    return(
        <div className="PTransfer">
            <hr />
            <div className="p-transfer-txt">Total Deposited:</div>
            <div className="p-transfer-amt">${props.user && user.currentMoneyDeposited}</div>
            <br />
            <div><Link to="/Transfers"><button className="transfer-btn">Make a Deposit</button></Link></div>
            <hr className="p-transfer-hr" />
        </div>
    )
}

export default PTransfer