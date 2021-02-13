import React, {useState, useEffect} from 'react'
import './tradeblock.css'
import {db} from '../../services/firebase'

const TBTE_Offers = (props) => {
    //props
    const t = props.t

    //states
    const [bids, setBids] = useState([])
    const [bidAmt, setBidAmt] = useState({})
    const [asks, setAsks] = useState([])
    const [askAmt, setAskAmt] = useState({})

    //Functions
    const getOffers = () => {
        let bidArr = []
        let bidAmtObj = {}
        let askArr = []
        let askAmtObj = {}
        db.collection('Asks').where('team', '==', t.team).orderBy("askPrice").limit(12).onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                if(askArr.includes(data.askPrice)){
                    askAmtObj[data.askPrice]++
                }
                else{
                    askArr.push(data.askPrice)
                    askAmtObj[data.askPrice] = 1
                }
            })
            askArr.sort(function(a, b) {
                return a - b;
            });
            setAsks(askArr)
            setAskAmt(askAmtObj)
        })
        db.collection('Bids').where('bidTeam', '==', t.team).orderBy("bidPrice", "desc").limit(12).onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                if(bidArr.includes(data.bidPrice)){
                    bidAmtObj[data.bidPrice]++
                }
                else{
                    bidArr.push(data.bidPrice)
                    bidAmtObj[data.bidPrice] = 1
                }
            })
            bidArr.sort(function(a, b) {
                return b - a;
            });
            setBids(bidArr)
            setBidAmt(bidAmtObj)
        })
    }
    useEffect(() => {
        getOffers()
    }, [])

    return(
        <div className="tbte-offers-div">
            <div className="tbte-offers-div-sub">
                <div className="tbte-offers-name">Offers To Buy</div>
                {bids.length > 0 && bids.map(b => {
                    return <div className="tbte-offers-item" key={b}>{bidAmt[b]} x ${b.toFixed(2)}</div>
                })}
                {bids.length === 0 && <div className="tbte-offers-item">(none)</div>}
            </div>
            <div className="tbte-offers-div-sub">
                <div className="tbte-offers-name">Offers To Sell</div>
                {asks.length > 0 && asks.map(a => {
                    return <div className="tbte-offers-item" key={a}>{askAmt[a]} x ${a.toFixed(2)}</div>
                })}
                {asks.length === 0 && <div className="tbte-offers-item">(none)</div>}
            </div>
        </div>
    )
}

export default TBTE_Offers