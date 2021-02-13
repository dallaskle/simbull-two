import React, {useState, useEffect} from 'react'
import './histories.css'
import {db} from '../../../services/firebase'

const TradeHistory = (props) => {
    //props
    const user = props.user

    //states
    const [buys, setBuys] = useState([])
    const [sells, setSells] = useState([])
    const [trades, setTrades] = useState([])

    //Functions
    const getTrades = () => {
        if(trades.length === 0){
            let buysArr = []
            let sellsArr = []
            db.collection('Transactions').where('buyer', '==', user.email).get().then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                    buysArr.push(data)
                })
                setBuys(buysArr)
            })
            db.collection('Transactions').where('seller', '==', user.email).get().then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                    sellsArr.push(data)
                })
                setSells(sellsArr)
            })
        }
    }
    useEffect(() => {
        getTrades()
    }, [])

    const combineTrades = () => {
        let tradesArr = buys.concat(sells)
        tradesArr.sort(function(a, b) {
            return b.date - a.date;
        });
        setTrades(tradesArr)
    }
    useEffect(() => {
        combineTrades()
    }, [buys, sells])

    return(
        <div className="TradeHistory">
            {trades.length > 0 && trades.map(t=> {
                return(
                    <div className="h-trade-div">
                        <hr className="h-trade-hr" />
                        <div className="h-trade-div-left">
                            <div className="h-trade-div-type">
                                {t.buyer === user.email ? `Buy: sim${t.share.substring(0, t.share.length - 4)}` : `Sell: Sim${t.share.substring(0, t.share.length - 4)}`}
                            </div>
                            <div className="h-trade-div-date">   
                                {`${t.date.substring(4, 6)}/${t.date.substring(6, 8)}/${t.date.substring(0, 4)}`}
                            </div>
                        </div>
                        <div className="h-trade-div-right blk-txt"> 
                            {t.buyer === user.email ? '-' : '+'}{`$${t.price.toFixed(2)}`}
                        </div>
                    </div>
                )
            })}
            
            <hr className="h-trade-hr" />
        </div>
    )
}

export default TradeHistory