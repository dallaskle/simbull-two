import React, {useState, useEffect} from 'react'
import './tradeblock.css'
import TBtradeCard from './TBtradeCard'
import {firebaseAnalytics} from '../../services/firebase'

const TBtrades = (props) => {
    const user = props.user

    const nbaTeams = ['Celtics',, 'Nets', 'Knicks', '76ers', 'Raptors', 'Warriors', 'Clippers', 'Lakers', 'Suns', 'Kings', 'Bulls', 'Cavaliers', 'Pistons', 'Pacers', 'Bucks', 'Hawks', 'Hornets', 'Heat', 'Magic', 'Wizards', 'Nuggets', 'Timberwolves', 'Thunder', 'Blazers', 'Jazz', 'Mavericks', 'Rockets', 'Grizzlies', 'Pelicans', 'Spurs']
    const nflTeams = ['Patriots', 'Bills', 'Dolphins', 'Jets', 'Cowboys', 'Giants', 'Eagles', 'Football', 'Ravens', 'Bengals', 'Browns', 'Steelers', 'Bears', 'Lions', 'Packers', 'Vikings', 'Texans', 'Colts', 'Jaguars', 'Titans', 'Falcons', 'Panthers', 'Saints', 'Bucs', 'Broncos', 'Chiefs', 'Raiders', 'Chargers', 'Cardinals', 'Rams', '49ers', 'Seahawks']


    //states
    const [sortType, setSortType] = useState('all')
    const [pastDay, setPastDay] = useState()
    const [pastWeek, setPastWeek] = useState()
    const [nflD, setNflD] = useState()
    const [nbaD, setNbaD] = useState()
    const [nflW, setNflW] = useState()
    const [nbaW, setNbaW] = useState()

    //Functions
    const countTransactions = () => {
        let day = 0
        let week = 0
        let nbaDay = 0
        let nflDay = 0
        let nbaWeek = 0
        let nflWeek = 0
        if(props.transactions){
            props.transactions.map(t => {
                if(t.date >= props.week){
                    week = week + 1
                    if(nbaTeams.includes(t.share.substring(0, t.share.length - 4))){
                        nbaWeek = nbaWeek + 1
                    }else if(nflTeams.includes(t.share.substring(0, t.share.length - 4))){
                        nflWeek = nflWeek + 1
                    }
                }
                if(t.date >= props.yesterday){
                    day = day + 1
                    if(nbaTeams.includes(t.share.substring(0, t.share.length - 4))){
                        nbaDay = nbaDay + 1
                    }else if(nflTeams.includes(t.share.substring(0, t.share.length - 4))){
                        nflDay = nflDay + 1
                    }
                }
            })
            setPastDay(day)
            setPastWeek(week)
            setNbaD(nbaDay)
            setNflD(nflDay)
            setNbaW(nbaWeek)
            setNflW(nflWeek)
        }
    }
    useEffect(() => {
        countTransactions()
    }, [props])

    useEffect(()=>{
        firebaseAnalytics.logEvent("tradeFeed_visit", {
           user: user &&  user.email 
        })
    },[])

    return(
        <div className="TBtrades">
            {props.sort && <div className="tb-filter-div">
                <button className={sortType === 'nfl' ? "tb-filter-div-btn tb-filter-btn-selected" : "tb-filter-div-btn"} onClick={()=>{setSortType('nfl')}}>SimNFL only</button>
                <button className={sortType === 'nba' ? "tb-filter-div-btn tb-filter-btn-selected" : "tb-filter-div-btn"} onClick={()=>{setSortType('nba')}}>SimNBA only</button>
                <button className={sortType === 'all' ? "tb-filter-div-btn-all tb-filter-btn-selected" : "tb-filter-div-btn-all"} onClick={()=>{setSortType('all')}}>All</button>
            </div>}
            <div className="tb-t-div">
                <div className="tb-t-title">Trades</div>
                <div className="tb-t-day">Past 24 Hours</div>
                <div className="tb-t-day">Past Week</div>
                <hr className="tb-t-hr" />
                <hr className="tb-t-hr" />
                <div className="tb-t-amt">{sortType === 'all' ? pastDay : sortType === 'nfl' ? nflD : nbaD}</div>
                <div className="tb-t-amt">{sortType === 'all' ? pastWeek : sortType === 'nfl' ? nflW : nbaW}</div>
            </div>
            <div className="tb-cards">
                
                {props.transactions.length > 1 && sortType === 'all' && props.transactions.map(t => {
                    return <TBtradeCard t={t} />
                })}
                {props.transactions.length > 1 && sortType === 'nba' && props.transactions.map(t => {
                    if(nbaTeams.includes(t.share.substring(0, t.share.length - 4))){
                        return <TBtradeCard t={t} />
                    }
                })}
                {props.transactions.length > 1 && sortType === 'nfl' && props.transactions.map(t => {
                    if(nflTeams.includes(t.share.substring(0, t.share.length - 4))){
                        return <TBtradeCard t={t} />
                    }
                })}
            </div>
            
        </div>
    )
}

export default TBtrades