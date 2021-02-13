import React, {useState, useEffect} from 'react'
import './tradeblock.css'
import {Link} from 'react-router-dom'
import TeamGraph from '../Holdings/TeamGraph'
import TBTE_Offers from './TBTE_Offers'
import TradeButtons from '../Functionality/TradeButtons'
import TC_Offers from '../Holdings/TC_Offers'

const TBteamExpand = (props) => {
    //props
    const shares = props.shares
    const user = props.user
    const t = props.t
    const labels = props.labels
    const prices = props.prices

    //States
    const [showGraph, setShowGraph] = useState(false)
    const [paidForShares, setPaidForShares] = useState(0)
    const [winPayoutsValue, setWinPayoutsValue] = useState(0)

    return(
        <div className="TBteamExpand">
            {shares > 0 && <><hr className="tbte-hr" />
             <div className="tbte2-position-div">
                <div className="tbte-position-title">Your Position</div>
                <div className="tbte-position-item">
                    <span className="tbte-p-name">Shares:</span> 
                    <span className="tbte-p-span">{shares}</span>
                </div>
                {/*<div className="tbte-position-item"> 
                    <span className="tbte-p-name">Avg Cost:</span>
                    <span className="tbte-p-span">$30.69</span>
                </div>*/}
                <div className="tbte-position-item">
                    <span className="tbte-p-name">Value: </span>
                    <span className="tbte-p-span">${(shares * t.lastSoldPrice).toFixed(2)}</span>
                </div>
                {/*<div className="tbte-position-item">
                    <span className="tbte-p-name">Portfolio Diversity: </span>
                    <span className="tbte-p-span">1.26%</span>
                </div>*/}
            </div></>}
            <TC_Offers user={user} t={t} />
            <hr className="tbte-hr" />
            {!showGraph && <Link onClick={()=>{return setShowGraph(true)}}><div className="tbte-expand-graph">Show Graph</div></Link>}
            {showGraph && <TeamGraph labels={labels} prices={prices} show={true} className="te-graph" />}
            <TBTE_Offers t={t} />
            <TradeButtons user={user} team={t} shares={shares} />
             
           
            {/*
            <div className="tbte-return-div">
                <hr className="tbte-return-hr" />
                <div className="tbte-return-item">Share Return</div>
                <div className="tbte-return-amt">$21.72  [ 5.90% ]</div>
                <hr className="tbte-return-hr" />
                <div className="tbte-return-item">Win Payout Returm</div>
                <div className="tbte-return-amt">$9.60  [ 2.61% ]</div>
                <hr className="tbte-return-hr" />
                <div className="tbte-return-item">Total Return</div>
                <div className="tbte-return-amt">$31.32  [ 8.50% ]</div>
                <hr className="tbte-return-hr" />
            </div>
            */}
            <div className="tbte-stats-div">
                <div className="tbte-stats-title">Stats</div>
                <div className="tbte-stats-item">
                    <div className="tbte-stats-name">52 Week High</div>
                    <div className="tbte-stats-amt">${t.yearHigh.toFixed(2)}</div>
                    <hr className="tbte-stats-hr" />
                </div>
                <div className="tbte-stats-item">
                    <div className="tbte-stats-name">52 Week Low</div>
                    <div className="tbte-stats-amt">${t.yearLow.toFixed(2)}</div>
                    <hr className="tbte-stats-hr" />
                </div>
                <div className="tbte-stats-item">
                    <div className="tbte-stats-name">52 Week Payout</div>
                    <div className="tbte-stats-amt">${t.league === 'NBA' ? (t.wins * 0.10).toFixed(2) : (t.wins * 0.50).toFixed(2)}</div>
                    <hr className="tbte-stats-hr" />
                </div>
                <div className="tbte-stats-item">
                    <div className="tbte-stats-name">Team Cap</div>
                    <div className="tbte-stats-amt">${(t.sharesOutstanding * t.lastSoldPrice).toFixed(2)}</div>
                    <hr className="tbte-stats-hr" />
                </div>
                <div className="tbte-stats-item">
                    <div className="tbte-stats-name">Price/Wins</div>
                    <div className="tbte-stats-amt">{(t.lastSoldPrice / t.wins).toFixed(2)}</div>
                    <hr className="tbte-stats-hr" />
                </div>
                <div className="tbte-stats-item">
                    <div className="tbte-stats-name">Win Payout %</div>
                    <div className="tbte-stats-amt">{t.league === 'NBA' ? ((0.10 / t.lastSoldPrice)*100).toFixed(2) : ((0.50 / t.lastSoldPrice)*100).toFixed(2)}%</div>
                    <hr className="tbte-stats-hr" />
                </div>
            </div>
        </div>
    )
}

export default TBteamExpand