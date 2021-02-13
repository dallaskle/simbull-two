import React, {useState, useEffect} from 'react'
import './tradeblock.css'
import TBtrades from './TBtrades'
import TBoffers from './TBoffers'
import TBnfl from './TBnfl'
import TBnba from './TBnba'
import {Link} from 'react-router-dom'
import {db, firebaseAnalytics} from '../../services/firebase'
import moment from 'moment'

const TradeBlock = (props) => {
    //props
    const user = props.user

    //states
    const [show, setShow] = useState('NBA')
    const [transactions, setTransactions] = useState([])
    const [sort, setSort] = useState(false)
    const [nba, setNba] = useState([])
    const [nfl, setNfl] = useState([])

    useEffect(() => {
        setNba(props.nba)
        setNfl(props.nfl)
    }, [props.nba, props.nfl])

    //Functions
    let date = moment().subtract(7,'d').format('YYYYMMDD')
    let yesterday = moment().subtract(1,'d').format('YYYYMMDD')
    let todate = moment().format('YYYYMMDD')
    const getTransactions = () => { 
        let tranArr = []
        db.collection('Transactions').where('date', '>=', date).onSnapshot(querySnap => {
            querySnap.forEach(doc => {
                const data = doc.data()
                tranArr.push(data)
            })
            tranArr.sort(function(a, b) {
                return b.time - a.time;
            });
            setTransactions(tranArr)
        })
    }
    useEffect(() => {
        getTransactions()
    }, [])

    useEffect(()=>{
        firebaseAnalytics.logEvent("trading_block_visit", {
           user: user && user.email 
        })
    },[])

    return(
        <div className="TradeBlock">
            <div className="tb-cash-div">Cash: ${user.cash && user.cash.toFixed(2)}</div>
            <div className="TBmenu scrollmenu scroll">
                <Link className={show === 'NBA' ? 'black selected t-menu-item' : 'black t-menu-item'} onClick={()=>{setShow('NBA'); setSort(false)}}><span className={show === 'NBA' ? 'black selected' : 'black'}>SimNBA</span></Link>
                <Link className={show === 'NFL' ? 'black selected t-menu-item' : 'black t-menu-item'} onClick={()=>{setShow('NFL'); setSort(false)}}><span className={show === 'NFL' ? 'black selected' : 'black'}>SimNFL</span></Link>
                <Link className={show === 'Trades' ? 'black selected t-menu-item' : 'black t-menu-item'} onClick={()=>{setShow('Trades'); setSort(false)}}><span className={show === 'Trades' ? 'black selected' : 'black'}>Trades</span></Link>
                <Link className={show === 'Offers' ? 'black selected t-menu-item' : 'black t-menu-item'} onClick={()=>{setShow('Offers'); setSort(false)}}><span className={show === 'Offers' ? 'black selected' : 'black'}>Offers</span></Link>
                <Link onClick={()=>{setSort(!sort)}} className="t-menu-item"><i className="fa fa-filter"></i></Link>
            </div>
            {show === 'NBA' && <TBnba user={user} nba={nba} sort={sort} />}
            {show === 'NFL' && <TBnfl user={user} nfl={nfl} sort={sort} />}
            {show === 'Trades' && <TBtrades user={user} transactions={transactions} week={date} today={todate} yesterday={yesterday} sort={sort} />}
            {show === 'Offers' && <TBoffers user={user} teams={props.teams} week={date} today={todate} yesterday={yesterday} sort={sort} />}

        </div>
    )
}

export default TradeBlock