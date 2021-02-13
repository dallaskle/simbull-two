import React, {useState, useEffect} from 'react'
import './functions.css'
import {Link} from 'react-router-dom'
import {db} from '../../services/firebase'
import firebase from 'firebase'
import moment from 'moment'


const CreateBid = (props) => {
    //props
    const team = props.team
    const user = props.user
    const closeBid = props.closeBid

    //states
    const [calc, setCalc] = useState('')
    const [showShare, setShowShare] = useState(true)
    const [showPrice, setShowPrice] = useState(false)
    const [bidPrice, setBidPrice] = useState()
    const [bidShares, setBidShares] = useState()
    const [maxBuy, setMaxBuy] = useState(7)

    let today = moment().format('YYYYMMDD')

    //Functionality
    //calc add digit
    const addDigit = (x) => {
        console.log(calc)
        if(x === '.' && calc.substring(calc.length - 1, calc.length) === '.'){
            return null
        }else{
            if(showShare){
                let hold = calc
                let thisNum = hold.concat(x)
                console.log(thisNum)
                setBidShares(parseFloat(thisNum))
                setCalc(thisNum)
            }else if(showPrice){
                let hold = calc
                let thisNum = hold.concat(x)
                console.log(thisNum)
                setBidPrice(parseFloat(thisNum))
                setCalc(thisNum)
            }
        }
        
    }

    const deleteDigit = () => {
        if(showShare){
            const editedText = calc.slice(0, -1)
            setBidShares(parseFloat(editedText))
            setCalc(editedText)
        }else if(showPrice){
            const editedText = calc.slice(0, -1)
            setBidPrice(parseFloat(editedText))
            setCalc(editedText)
        }
        
    }

    function createBid() {
        let numShares = 0
        let totalPrice = 0
        db.collection('Asks').where('team', '==', team.team).get().then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              if(data.askOwner != user.email){
                if(bidPrice >= data.askPrice){
                    numShares++
                    if(numShares <= bidShares){
                      totalPrice = totalPrice + data.askPrice
                  }
                }
              }
            });
            if(numShares >= bidShares && totalPrice <= (bidShares * bidPrice).toFixed(2)){
                if(bidShares<=maxBuy){
                    let stillCreate = window.confirm(`There are enough open offers to sell to fill your order! You can buy the available shares for $${(totalPrice/bidShares).toFixed(2)} per share. Would you still like to create the offer to buy?`)
                    if(stillCreate){
                        if(user.cash > (bidPrice * bidShares) + 1){
                            var batch = db.batch()
                            for(let i = 0; i < bidShares; i++) {
                                let thisRef = db.collection('Bids').doc(`${team.team}-${user.email}-$${parseFloat(bidPrice)}-${i}`)
                                batch.set(thisRef, {
                                    bidOwner: user.email,
                                    bidPrice: parseFloat(bidPrice),
                                    bidTeam: team.team,
                                    bidNum: i,
                                    subscription: user.subscription,
                                    time: firebase.firestore.Timestamp.now(),
                                    date: today
                                })
                            }
                            let newBidsAvailable = parseFloat(team.bidsAvailable) + parseFloat(bidShares)
                            let newTotalBidPrice = team.totalBidPrice + (bidShares * bidPrice)
                            let newHighestBidPrice = bidPrice > team.highestBidPrice ? bidPrice : team.highestBidPrice
                            let teamRef = db.collection('Teams').doc(team.team)
                            batch.update(teamRef, {
                                bidsAvailable: parseFloat(newBidsAvailable),
                                totalBidPrice: parseFloat(newTotalBidPrice),
                                highestBidPrice: parseFloat(newHighestBidPrice)
                            })
                            batch.commit().then(()=> {
                                alert(`You created an offer to buy ${bidShares} shares for a price of $${bidPrice} per share, for a total of $${bidPrice * bidShares}.`)
                                window.location.href = "http://simbull.app";
                            }).catch((error) => console.log(error));
                        }else{
                            alert(`You don't have enough cash to cover the offer to buy`)
                        }
                    }
                }
                else{
                    alert(`Sorry we can't create that bid for you because it put you over the maximum amount of shares for a single team. You can only create a bid for ${maxBuy} shares.`)
                }
                   
            }
            else{
                if(user.cash > (bidPrice * bidShares)){
                    if(bidShares<=maxBuy){
                        if(window.confirm(`Do you want to create an offer to buy ${bidShares} shares for a price of $${bidPrice} per share, for a total of $${bidPrice * bidShares}?`)){
                            var batch = db.batch()
                            for(let i = 0; i < bidShares; i++) {
                                let thisRef = db.collection('Bids').doc(`${team.team}-${user.email}-$${parseFloat(bidPrice)}-${i}`)
                                batch.set(thisRef, {
                                    bidOwner: user.email,
                                    bidPrice: parseFloat(bidPrice),
                                    bidTeam: team.team,
                                    bidNum: i,
                                    subscription: user.subscription,
                                    time: firebase.firestore.Timestamp.now(),
                                    date: today
                                })
                            }
                            let newBidsAvailable = parseFloat(team.bidsAvailable) + parseFloat(bidShares)
                            let newTotalBidPrice = team.totalBidPrice + (bidShares * bidPrice)
                            let newHighestBidPrice = bidPrice > team.highestBidPrice ? bidPrice : team.highestBidPrice
                            let teamRef = db.collection('Teams').doc(team.team)
                            batch.update(teamRef, {
                                bidsAvailable: parseFloat(newBidsAvailable),
                                totalBidPrice: parseFloat(newTotalBidPrice),
                                highestBidPrice: parseFloat(newHighestBidPrice)
                            })
                            batch.commit().then(()=> {
                                alert(`You created an offer to buy ${bidShares} shares for a price of $${bidPrice} per share, for a total of $${bidPrice * bidShares}.`)
                                window.location.href = "http://simbull.app";
                            }).catch((error) => console.log(error));
                        }
                    }
                    else{
                        alert(`Sorry we can't create that bid for you because it put you over the maximum amount of shares for a single team. You can only create a bid for ${maxBuy} shares.`)
                    }
                }else{
                    alert('You dont have enough cash to cover the offer to buy')
                }
            }
          })
          .catch((error) => console.log(error));
         
    }

    const checkShareAmt = () => {
        if(user.shares){
            let count = 0
            user.shares.map(s => {
                let share = s.substring(0, s.length - 4)
                if(share == team.team){
                    count++
                }
            })
            let buyAmt = 7 - count
            setMaxBuy(buyAmt)
        }
    }
    useEffect(() => {
        checkShareAmt()
    }, [user])

    return(
        <div className="TradePopup">
            <div className="SellShare">
                <Link onClick={closeBid}><i className="fa fa-times-circle"></i></Link>
                <div className="ss-title">Offer to Buy</div>
                <div className='ss-team'><img className="ss-img"  src={`nba_jersey/${team.team}.png`} alt='team' /><span className="tc-name-sim">sim</span>{team.team}</div>
                <div className="h-bidask">
                    <div className="h-bid">
                        Bid
                        <br />
                        <div className="h-bid-p green">{team.highestBidPrice.toFixed(2)}</div>
                    </div>
                    <div className="h-price">
                        ${team.lastSoldPrice.toFixed(2)}
                    </div>
                    <div className="h-ask">
                        Ask
                        <br />
                        <div className="h-ask-p red">{team.lowestAskPrice.toFixed(2)}</div>
                    </div>   
                </div>
                <div className='ss-cash'>Cash Available: ${user.cash && user.cash.toFixed(2)}</div>
                {showShare && <div className="ss-shareAmt"><span className="ss-share-label">Shares:</span> <span className="ss-shareAmt-underline">{calc ? calc : '0'}</span></div>}
                {showPrice && <div className="ss-shareAmt"><Link onClick={()=>{setShowPrice(false);setShowShare(true);setCalc('');setBidPrice();setBidShares()}}><i className="fa fa-undo"></i></Link><span className="ss-share-label">Price:</span> <span className="ss-shareAmt-underline">{calc ? calc : '0.00'}</span></div>}
                <div className="ss-btn-div">
                    {showShare && <><button className="ss-submit" onClick={()=>{setShowPrice(true);setShowShare(false);setCalc('')}}>Next</button><br /></>}
                    {showPrice && <><button className="ss-submit" onClick={createBid}>Create Offer to Buy</button><br /></>}
                    <button className="ss-btn" onClick={()=>{addDigit("1")}}>1</button>
                    <button className="ss-btn" onClick={()=>{addDigit("2")}}>2</button>
                    <button className="ss-btn" onClick={()=>{addDigit("3")}}>3</button>
                    <button className="ss-btn" onClick={()=>{addDigit("4")}}>4</button>
                    <button className="ss-btn" onClick={()=>{addDigit("5")}}>5</button>
                    <button className="ss-btn" onClick={()=>{addDigit("6")}}>6</button>
                    <button className="ss-btn" onClick={()=>{addDigit("7")}}>7</button>
                    <button className="ss-btn" onClick={()=>{addDigit("8")}}>8</button>
                    <button className="ss-btn" onClick={()=>{addDigit("9")}}>9</button>
                    {showPrice && <button className="ss-btn" onClick={()=>{addDigit(".")}}>.</button>}
                    <button className="ss-btn" onClick={()=>{addDigit("0")}}>0</button>
                    <button className="ss-btn-2" onClick={()=>{deleteDigit()}}><i className="fa fa-arrow-left"></i></button>
                </div>
            </div> 
        </div>
    )
}

export default CreateBid