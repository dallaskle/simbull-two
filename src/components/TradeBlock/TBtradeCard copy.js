import React from 'react'
import './tradeblock.css'

const TBtradeCard = () => {
    return(
        <div className="TBtradeCard">
            <div className="tb-tc-name">Hornets</div>
            <div className="tb-tc-price">$21.00</div>
            <div className="tb-tc-percent">5.79%</div>
            <div className="tb-tc-before"><span className="tb-tc-sm">Before:</span> 15.01</div>
            <div className="tb-tc-date">01/09/2021</div>
            <div className="tb-tc-type">Bought from an open ask</div>
        </div>
    )
}

export default TBtradeCard