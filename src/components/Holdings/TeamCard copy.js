import React, {useState, useEffect} from 'react'
import './TeamCard.css'
import TeamGraph_NoAxis from './TeamGraph_NoAxis'
import TeamExpand from './TeamExpand'
import {Link} from 'react-router-dom'
import moment from 'moment'

const TeamCard = (props) => {

    //Get Props
    const user = props.user
    const t = props.t
    
    //Set States
    const [show, setShow] = useState(false)
    const [prices, setPrices] = useState([])
    const [labels, setLabels] = useState([])

    //Functions
    //get the specific number of shares you own of this iteam
    function getNumOfShares(t) {
        let numOfShares = 0
        if(user.shares !== 0){
            user.shares.map(s => {
                if(s.substring(0, s.length - 4) === t.team){
                    numOfShares++
                }
            })
        }
        return(numOfShares)
    }

    //get the percent change on right middle
    const getPercentChange = () => {
        let weekAgo = moment().subtract(7,'d').format('YYYYMMDD');
        let priceChange = (t.lastSoldPrice - t.prices[weekAgo]).toFixed(2)
        return priceChange
    }

    //get an array of labels for the graph
    //get an array of the prices for the graph
    const getGraphInfo = () => {
        let tenure = t.tenure
        let datesArr = []
        let labelArr = []
        let pricesArr = []
        for(let i = tenure; i>0; i--){
            let d = moment().subtract(i, 'd').format('YYYYMMDD')
            datesArr.push(d)
            labelArr.push(moment().subtract(i, 'd').format('MMM DD'))
            pricesArr.push(t.prices[d] && t.prices[d].toFixed(2))
        }
        setPrices(pricesArr)
        setLabels(labelArr)
    }
    useEffect(() => {
        getGraphInfo()
    }, [])

    return(
        <div className="TeamCard">
            <Link onClick={()=>{setShow(!show)}}>
            <div className="tc-left">
                {!show && <div className="tc-name"><span className="tc-name-sim">sim</span>{t.team}</div>}
                <div className="tc-img-div">
                    <img src={`nba_jersey/${t.team}.png`} className={!show ? "tc-img" : "tc-img-bigger"} alt='jersey' />
                </div>
            </div>
            <div className={!show ? "tc-middle tc-bottom" : "tc-middle tc-top"}>
                {show && <div className="tc-name2"><div><span className="tc-name-sim">sim</span>{t.team}</div></div>}
                {show && <div className="tc-record">( {t.wins} - {t.losses} )</div>}
                {!show && <>
                    <div className="tc-graph">
                        <TeamGraph_NoAxis labels={labels} prices={prices} show={false} />
                    </div>    
                    <div className="tc-shares">
                        Shares: {getNumOfShares(t)}
                </div></> } 
            </div>
            <div className="tc-right">
                <div className="tc-price-div">
                    <span className="tc-price">
                        ${t.lastSoldPrice.toFixed(2)}
                    </span>
                    <span className={getPercentChange() >= 0 ? "tc-price-change green" : "tc-price-change red"} >
                        {getPercentChange() >= 0 && "+"}{getPercentChange()}%
                    </span>
                    
                </div>
                
                <div className="tc-bidask">
                    <div className="tc-bid">Bid</div>
                    <div className="tc-ask">Ask</div><br />
                    <div className="tc-bid-p">{t.highestBidPrice.toFixed(2)}</div>
                    <div className="tc-ask-p">{t.lowestAskPrice.toFixed(2)}</div>
                </div>
            </div>
            </Link>
            {show && <TeamExpand labelArr={labels} pricesArr={prices} shares={getNumOfShares(t)} user={user} t={t} />}
        </div>
    )
}

export default TeamCard