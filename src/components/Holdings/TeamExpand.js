import React, {useState, useEffect} from 'react'
import './TeamCard.css'
import TeamGraph from './TeamGraph'
import {db} from '../../services/firebase'
import TC_Offers from './TC_Offers'
import TradeButtons from '../Functionality/TradeButtons'

const TeamExpand = (props) => {
    //props
    const labelArr = props.labelArr
    const pricesArr = props.pricesArr
    const shares = props.shares
    const user = props.user
    const t = props.t

    //States
    const [paidForShares, setPaidForShares] = useState(0)
    const [winPayoutsValue, setWinPayoutsValue] = useState(0)

    //Functions
    const getShares = () => {
        let paid = 0
        let payouts = 0
        db.collection('Shares').where('owner', '==', user.email).where('team', '==', t.team).get().then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                paid = paid + data.lastSoldPrice
                payouts = payouts + data.totalPayouts
            })
            setPaidForShares(paid)
            setWinPayoutsValue(payouts)
        })
    }
    useEffect(() => {
        getShares()
    }, [])

    return(
        <div className="TeamExpand">
            <TC_Offers t={t} user={user} />
            <TeamGraph labels={labelArr} prices={pricesArr} show={true} className="te-graph" />
            <TradeButtons team={t} user={user} shares={shares} />
            <div className="te-position-div">
                <div className="te-position-title">Your Position</div>
                <div className="te-position-item">
                    <span className="te-p-name">Shares:</span> 
                    <span className="te-p-span">{shares}</span>
                </div>
                <div className="te-position-item"> 
                    <span className="te-p-name">Avg Cost:</span>
                    <span className="te-p-span">${(paidForShares / shares).toFixed(2)}</span>
                </div>
                <div className="te-position-item">
                    <span className="te-p-name">Value: </span>
                    <span className="te-p-span">${(t.lastSoldPrice * shares).toFixed(2)}</span>
                </div>
                <div className="te-position-item">
                    <span className="te-p-name">Portfolio Diversity: </span>
                    <span className="te-p-span">{(((t.lastSoldPrice * shares)/user.totalValue) * 100).toFixed(2)}%</span>
                </div>
            </div>
            <div className="te-return-div">
                <hr className="te-return-hr" />
                <div className="te-return-item">Share Return</div>
                <div className="te-return-amt">${(t.lastSoldPrice * shares - paidForShares).toFixed(2)}  [ {(((t.lastSoldPrice * shares - paidForShares)/ (t.lastSoldPrice * shares))*100).toFixed(2)}% ]</div>
                <hr className="te-return-hr" />
                <div className="te-return-item">Win Payout Return</div>
                <div className="te-return-amt">${winPayoutsValue.toFixed(2)}  [ {((winPayoutsValue/paidForShares)*100).toFixed(2)}% ]</div>
                <hr className="te-return-hr" />
                <div className="te-return-item">Total Return</div>
                <div className="te-return-amt">${( (t.lastSoldPrice * shares - paidForShares) + winPayoutsValue ).toFixed(2)}  [ {( (((t.lastSoldPrice * shares - paidForShares) + winPayoutsValue) / (t.lastSoldPrice * shares) )*100).toFixed(2)}% ]</div>
                <hr className="te-return-hr" />
            </div>
            <div className="te-stats-div">
                <div className="te-stats-title">Stats</div>
                <div className="te-stats-item">
                    <div className="te-stats-name">52 Week High</div>
                    <div className="te-stats-amt">${t.yearHigh.toFixed(2)}</div>
                    <hr className="te-stats-hr" />
                </div>
                <div className="te-stats-item">
                    <div className="te-stats-name">52 Week Low</div>
                    <div className="te-stats-amt">${t.yearLow.toFixed(2)}</div>
                    <hr className="te-stats-hr" />
                </div>
                <div className="te-stats-item">
                    <div className="te-stats-name">52 Week Payout</div>
                    <div className="te-stats-amt">${t.league === 'NBA' ? (t.wins * 0.10).toFixed(2) : (t.wins * 0.50).toFixed(2)}</div>
                    <hr className="te-stats-hr" />
                </div>
                <div className="te-stats-item">
                    <div className="te-stats-name">Team Cap</div>
                    <div className="te-stats-amt">${(t.sharesOutstanding * t.lastSoldPrice).toFixed(2)}</div>
                    <hr className="te-stats-hr" />
                </div>
                <div className="te-stats-item">
                    <div className="te-stats-name">Price/Wins</div>
                    <div className="te-stats-amt">{(t.lastSoldPrice / t.wins).toFixed(2)}</div>
                    <hr className="te-stats-hr" />
                </div>
                <div className="te-stats-item">
                    <div className="te-stats-name">Win Payout %</div>
                    <div className="te-stats-amt">{t.league === 'NBA' ? ((0.10 / t.lastSoldPrice)*100).toFixed(2) : ((0.50 / t.lastSoldPrice)*100).toFixed(2)}%</div>
                    <hr className="te-stats-hr" />
                </div>
            </div>
        </div>
    )
}

export default TeamExpand