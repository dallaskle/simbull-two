import React, {useState, useEffect} from 'react'
import './tradeblock.css'
import TeamGraph_NoAxis from '../Holdings/TeamGraph_NoAxis'
import {Link} from 'react-router-dom'
import TBteamExpand from './TBteamExpand'
import moment from 'moment'

const TBteamCard = (props) => {
    //props
    const t = props.t
    const user = props.user

    //states
    const [show, setShow] = useState(false)
    const [prices, setPrices] = useState([])
    const [labels, setLabels] = useState([])

    //get the percent change on right middle
    const getPercentChange = () => {
        let weekAgo = moment().subtract(7,'d').format('YYYYMMDD');
        let priceChange = (t.lastSoldPrice - t.prices[weekAgo]).toFixed(2)
        return priceChange
    }
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
        <div className="TBteamCard">
            <Link onClick={()=>{setShow(!show)}}>
            <div className="tbtc-left">
                <div className="tbtc-name"><span className="tc-name-sim">sim</span>{t.team}</div>
                <div className="tbtc-img-div">
                    <img src={`nba_jersey/${t.team}.png`} className="tbtc-img" alt='jersey' />
                </div>
            </div>
            <div className="tbtc-middle tbtc-bottom">
                <div className="tbtc-graph">
                    <TeamGraph_NoAxis labels={labels} prices={prices} show={false} />
                </div>    
                <div className="tbtc-shares">
                    Shares: {getNumOfShares(t)}
                </div>  
            </div>
            <div className="tbtc-right">
                <div className="tbtc-price-div">
                    <span className="tbtc-price">
                        ${t.lastSoldPrice && t.lastSoldPrice.toFixed(2)}
                    </span>
                    <span className={getPercentChange() >= 0 ? "tbtc-price-change green" : "tbtc-price-change red"} >
                        {getPercentChange()}% 
                    </span>
                    
                </div>
                
                <div className="tbtc-bidask">
                    <div className="tbtc-bid gray">Bid</div>
                    <div className="tbtc-ask gray">Ask</div><br />
                    <div className="tbtc-bid-p green">{t.highestBidPrice && t.highestBidPrice.toFixed(2)}</div>
                    <div className="tbtc-ask-p red">{t.lowestAskPrice && t.lowestAskPrice.toFixed(2)}</div>
                </div>
            </div>
            </Link>
            {show && <TBteamExpand labels={labels} prices={prices} shares={getNumOfShares(t)} user={user} t={t} />}
        </div>
    )
}

export default TBteamCard