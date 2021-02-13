import React, {useState, useEffect} from 'react'
import './tradeblock.css'
import TBteamCard from './TBteamCard'

const TBnfl = (props) => {
    //props
    const user = props.user

    //states
    const [nfl, setNfl] = useState([])
    const [sortType, setSortType] = useState()

    useEffect(() => {
        setNfl(props.nfl)
    }, [props.nfl])

    //Functionality
    const sortLow2High = () => {
        let arr = nfl
        arr.sort(function(a, b) {
            return a.lastSoldPrice - b.lastSoldPrice;
        })
        setSortType('PriceLow')
        return setNfl(arr)
    }
    const sortHigh2Low = () => {
        let arr = nfl
        arr.sort(function(a, b) {
            return b.lastSoldPrice - a.lastSoldPrice;
        })
        setSortType('PriceHigh')
        return setNfl(arr)
    }
    const sortLow2HighAsk = () => {
        let arr = nfl
        arr.sort(function(a, b) {
            return a.lowestAskPrice - b.lowestAskPrice;
        })
        setSortType('AskLow')
        return setNfl(arr)
    }
    const sortHigh2LowAsk = () => {
        let arr = nfl
        arr.sort(function(a, b) {
            return b.lowestAskPrice - a.lowestAskPrice;
        })
        setSortType('AskHigh')
        return setNfl(arr)
    }
    const sortLow2HighBid = () => {
        let arr = nfl
        arr.sort(function(a, b) {
            return a.highestBidPrice - b.highestBidPrice;
        })
        setSortType('BidLow')
        return setNfl(arr)
    }
    const sortHigh2LowBid = () => {
        let arr = nfl
        arr.sort(function(a, b) {
            return b.highestBidPrice - a.highestBidPrice;
        })
        setSortType('BidHigh')
        return setNfl(arr)
    }

    return(
        <div className="TBnfl">
            {props.sort && <>
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
            {nfl.map(t => {
                return <TBteamCard key={t.team} user={user} t={t} />
            })}
        </div>
    )
}

export default TBnfl