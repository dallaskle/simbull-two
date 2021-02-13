import React, {useEffect, useState} from 'react'
import './Holdings.css'
import TeamCard from './TeamCard'
import {Link} from 'react-router-dom'
import OpenBids from './OpenBids'
import OpenAsks from './OpenAsks'
import {firebaseAnalytics} from '../../services/firebase'


const Holdings = (props) => {
    const user = props.user

    const [teams, setTeams] = useState([])
    const [show, setShow] = useState('NBA')
    const [sort, setSort] = useState(false)
    const [sortType, setSortType] = useState()

    useEffect(() => {
        setTeams(props.teams)
    }, [props])

    const getMyTeams = () =>{
        const myTeams1 = []
        if(user.shares && user.shares.length !== 0){
            user.shares.map(s => {
                let shareTeam = s.substring(0,s.length - 4)
                if(!myTeams1.includes(shareTeam)){
                    myTeams1.push(shareTeam)
                }
            })
            return myTeams1
        } 
        else{
            return []
        }
    }

    useEffect(()=>{
        firebaseAnalytics.logEvent("myTeams_visit", {
           user: user && user.email 
        })
    },[])

    //Sorts
    const sortLow2High = () => {
        let arr = teams
        arr.sort(function(a, b) {
            return a.lastSoldPrice - b.lastSoldPrice;
        })
        setSortType('PriceLow')
        return setTeams(arr)
    }
    const sortHigh2Low = () => {
        let arr = teams
        arr.sort(function(a, b) {
            return b.lastSoldPrice - a.lastSoldPrice;
        })
        setSortType('PriceHigh')
        return setTeams(arr)
    }
    const sortLow2HighAsk = () => {
        let arr = teams
        arr.sort(function(a, b) {
            return a.lowestAskPrice - b.lowestAskPrice;
        })
        setSortType('AskLow')
        return setTeams(arr)
    }
    const sortHigh2LowAsk = () => {
        let arr = teams
        arr.sort(function(a, b) {
            return b.lowestAskPrice - a.lowestAskPrice;
        })
        setSortType('AskHigh')
        return setTeams(arr)
    }
    const sortLow2HighBid = () => {
        let arr = teams
        arr.sort(function(a, b) {
            return a.highestBidPrice - b.highestBidPrice;
        })
        setSortType('BidLow')
        return setTeams(arr)
    }
    const sortHigh2LowBid = () => {
        let arr = teams
        arr.sort(function(a, b) {
            return b.highestBidPrice - a.highestBidPrice;
        })
        setSortType('BidHigh')
        return setTeams(arr)
    }

    return(
        <>
        <div className='Holdings' id="holdings">  

            {/* Menu Bar */} 
            <div className="TBmenu-holdings scrollmenu-holdings scroll">
                <Link className={show === 'All' ? 'black selected h-menu-item' : 'black h-menu-item'} onClick={()=>{setShow('All'); setSort(false)}}><span className={show === 'All' ? 'black selected' : 'black'}>All</span></Link>
                <Link className={show === 'NBA' ? 'black selected h-menu-item' : 'black h-menu-item'} onClick={()=>{setShow('NBA'); setSort(false)}}><span className={show === 'NBA' ? 'black selected' : 'black'}>simNBA</span></Link>
                <Link className={show === 'NFL' ? 'black selected h-menu-item' : 'black h-menu-item'} onClick={()=>{setShow('NFL'); setSort(false)}}><span className={show === 'NFL' ? 'black selected' : 'black'}>simNFL</span></Link>
                <Link className="h-menu-item" onClick={()=>{setSort(!sort)}}><i className="fa fa-filter"></i></Link>
            </div>

            {/* Sorts */} 
            {sort && <>
                <div className="tb-sort-div">
                    <div className="tb-sort-div-item">
                        <div className="tb-sort-div-left">
                            Price: 
                        </div>
                        <div className="tb-sort-div-right">
                            <button className={sortType === 'PriceLow' ? "tb-sort-div-btn tb-sort-btn-selected" : "tb-sort-div-btn"} onClick={sortLow2High}>Low to High</button>
                            <button className={sortType === 'PriceHigh' ? "tb-sort-div-btn tb-sort-btn-selected" : "tb-sort-div-btn"} onClick={sortHigh2Low}>High to Low</button>
                        </div>
                    </div>
                    <div className="tb-sort-div-item">
                        <div className="tb-sort-div-left">
                            Bid: 
                        </div>
                        <div className="tb-sort-div-right">
                            <button className={sortType === 'BidLow' ? "tb-sort-div-btn tb-sort-btn-selected" : "tb-sort-div-btn"} onClick={sortLow2HighBid}>Low to High</button>
                            <button className={sortType === 'BidHigh' ? "tb-sort-div-btn tb-sort-btn-selected" : "tb-sort-div-btn"} onClick={sortHigh2LowBid}>High to Low</button>
                        </div>
                    </div>
                    <div className="tb-sort-div-item">
                        <div className="tb-sort-div-left">
                            Ask: 
                        </div>
                        <div className="tb-sort-div-right">
                            <button className={sortType === 'AskLow' ? "tb-sort-div-btn tb-sort-btn-selected" : "tb-sort-div-btn"} onClick={sortLow2HighAsk}>Low to High</button>
                            <button className={sortType === 'AskHigh' ? "tb-sort-div-btn tb-sort-btn-selected" : "tb-sort-div-btn"} onClick={sortHigh2LowAsk}>High to Low</button>
                        </div>
                    </div>
                </div>    
            </>}

            {/* Team Cards */} 
            {show === 'All' ? teams.map(t => {
                let indTeams = getMyTeams()
                if(indTeams.includes(t.team)){
                    return <TeamCard key={t.team} user={user} t={t} />
                }
            })
             : 
            show === 'NBA' ? teams.map(t => {
                if(t.league === 'NBA'){
                    let indTeams = getMyTeams()
                    if(indTeams.includes(t.team)){
                        return <TeamCard key={t.team} user={user} t={t} />
                    }
                }
            })
            :
            teams.map(t => {
                if(t.league === 'NFL'){
                    let indTeams = getMyTeams()
                    if(indTeams.includes(t.team)){
                        return <TeamCard key={t.team} user={user} t={t} />
                    }
                }
            }) 
            }

            {/* Text if you have no shares */} 
            {user && user.shares && user.shares.length === 0 && <>
                <div>You don't own any teams</div>
            </>}

            {/* Offers */} 
            <OpenBids user={user} />
            <OpenAsks user={user} teams={teams} />            
        </div>
        </>
    )
}

export default Holdings