import React, {useState, useEffect} from 'react'
import './tradeblock.css'
import TBofferCard from './TBofferCard'
import moment from 'moment'
import {db, firebaseAnalytics} from '../../services/firebase'

const TBoffers = (props) => {
    const user = props.user

    const nba = ['Celtics',, 'Nets', 'Knicks', '76ers', 'Raptors', 'Warriors', 'Clippers', 'Lakers', 'Suns', 'Kings', 'Bulls', 'Cavaliers', 'Pistons', 'Pacers', 'Bucks', 'Hawks', 'Hornets', 'Heat', 'Magic', 'Wizards', 'Nuggets', 'Timberwolves', 'Thunder', 'Blazers', 'Jazz', 'Mavericks', 'Rockets', 'Grizzlies', 'Pelicans', 'Spurs']
    const nfl = ['Patriots', 'Bills', 'Dolphins', 'Jets', 'Cowboys', 'Giants', 'Eagles', 'Football', 'Ravens', 'Bengals', 'Browns', 'Steelers', 'Bears', 'Lions', 'Packers', 'Vikings', 'Texans', 'Colts', 'Jaguars', 'Titans', 'Falcons', 'Panthers', 'Saints', 'Bucs', 'Broncos', 'Chiefs', 'Raiders', 'Chargers', 'Cardinals', 'Rams', '49ers', 'Seahawks']

    //states
    const [sortType, setSortType] = useState('all')
    const [bids, setBids] = useState([])
    const [asks, setAsks] = useState([])
    const [offers, setOffers] = useState([])
    const [bidsDay, setBidsDay] = useState(0)
    const [asksDay, setAsksDay] = useState(0)
    const [nbaAskD, setNbaAskD] = useState(0)
    const [nbaAskW, setNbaAskW] = useState(0)
    const [nbaBidD, setNbaBidD] = useState(0)
    const [nbaBidW, setNbaBidW] = useState(0)
    const [nflAskD, setNflAskD] = useState(0)
    const [nflAskW, setNflAskW] = useState(0)
    const [nflBidD, setNflBidD] = useState(0)
    const [nflBidW, setNflBidW] = useState(0)
    

    //Functions
    let date = moment().subtract(7,'d').format('YYYYMMDD')
    let todate = moment().format('YYYYMMDD')
    const getBids = () => {
        let bidArr = []
        let BD = 0
        let nbaBD = 0
        let nbaBW = 0
        let nflBD = 0
        let nflBW = 0
        db.collection('Bids').where('date', '>=', date).onSnapshot(querySnap => {
            querySnap.forEach(doc => {
                const data = doc.data()
                bidArr.push(data)
                if(nba.includes(data.bidTeam)){
                    nbaBW++
                }else if(nfl.includes(data.bidTeam)){
                    nflBW++
                }
                if(data.date >= props.yesterday){
                    BD++
                    if(nba.includes(data.bidTeam)){
                        nbaBD++
                    }else if(nfl.includes(data.bidTeam)){
                        nflBD++
                    }
                }
            })
            setBids(bidArr)
            setBidsDay(BD)
            setNbaBidD(nbaBD)
            setNbaBidW(nbaBW)
            setNflBidD(nflBD)
            setNflBidW(nflBW)
        })
    }
    const getAsks = () => { 
        let askArr = []
        let AD = 0 
        let nbaAD = 0
        let nbaAW = 0
        let nflAD = 0
        let nflAW = 0
        db.collection('Asks').where('date', '>=', date).onSnapshot(querySnap => {
            querySnap.forEach(doc => {
                const data = doc.data()
                askArr.push(data)
                if(nba.includes(data.team)){
                    nbaAW++
                }else if(nfl.includes(data.team)){
                    nflAW++
                }
                if(data.date >= props.yesterday){
                    AD++
                    if(nba.includes(data.team)){
                        nbaAD++
                    }else if(nfl.includes(data.team)){
                        nflAD++
                    }
                }
            })
            setAsks(askArr)
            setAsksDay(AD)
            setNbaAskD(nbaAD)
            setNbaAskW(nbaAW)
            setNflAskD(nflAD)
            setNflAskW(nflAW)
        })
    }
    useEffect(() => {
        getBids()
        getAsks()
    }, [])
    const combineOffers = () => {
        let offersArr = bids.concat(asks)
        offersArr.sort(function(a, b) {
            return b.time - a.time;
        });
        setOffers(offersArr)
    }
    useEffect(() => {
        combineOffers()
    }, [bids, asks])


    useEffect(()=>{
        firebaseAnalytics.logEvent("offerFeed_visit", {
           user: user && user.email 
        })
    },[])

 
    return(
        <div className="TBoffers">
            {props.sort && <div className="tb-filter-div">
                <button className={sortType === 'nfl' ? "tb-filter-div-btn tb-filter-btn-selected" : "tb-filter-div-btn"} onClick={()=>{setSortType('nfl')}}>SimNFL only</button>
                <button className={sortType === 'nba' ? "tb-filter-div-btn tb-filter-btn-selected" : "tb-filter-div-btn"} onClick={()=>{setSortType('nba')}}>SimNBA only</button>
                <button className={sortType === 'all' ? "tb-filter-div-btn-all tb-filter-btn-selected" : "tb-filter-div-btn-all"} onClick={()=>{setSortType('all')}}>All</button>
            </div>}
            <div className="tb-o-div-left">
                <div className="tb-t-title">Bids</div>
                <div className="tb-t-day">Past 24 Hours</div>
                <div className="tb-t-day">Past Week</div>
                <hr className="tb-t-hr" />
                <hr className="tb-t-hr" />
                <div className="tb-t-amt">{sortType === 'all' ? bidsDay : sortType === 'nba' ? nflBidD : nbaBidD}</div>
                <div className="tb-t-amt">{sortType === 'all' ? bids.length : sortType === 'nba' ? nbaBidW : nflBidW}</div>
            </div>
            <div className="tb-o-div-right">
                <div className="tb-t-title">Asks</div>
                <div className="tb-t-day">Past 24 Hours</div>
                <div className="tb-t-day">Past Week</div>
                <hr className="tb-t-hr" />
                <hr className="tb-t-hr" />
                <div className="tb-t-amt">{sortType === 'all' ? asksDay : sortType === 'nfl' ? nflAskD : nbaAskD}</div>
                <div className="tb-t-amt">{sortType === 'all' ? asks.length : sortType === 'nfl' ? nflAskW : nbaAskW}</div>
            </div>
            <div className='tb-cards'>
                {sortType === 'all' && offers.map(o => {
                    return <TBofferCard teams={props.teams} o={o} />
                })}
                {sortType === 'nfl' && offers.map(o => {
                    if(o.bidTeam){
                        if(nfl.includes(o.bidTeam)){
                            return <TBofferCard teams={props.teams} o={o} />
                        }
                    }else{
                        if(nfl.includes(o.team)){
                            return <TBofferCard teams={props.teams} o={o} />
                        }
                    }
                    
                })}
                {sortType === 'nba' && offers.map(o => {
                     if(o.bidTeam){
                        if(nba.includes(o.bidTeam)){
                            return <TBofferCard teams={props.teams} o={o} />
                        }
                    }else{
                        if(nba.includes(o.team)){
                            return <TBofferCard teams={props.teams} o={o} />
                        }
                    }
                })}
            </div>
        </div>
    )
}

export default TBoffers