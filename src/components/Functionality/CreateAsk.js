import React, {useState, useEffect} from 'react'
import './functions.css'
import {Link} from 'react-router-dom'
import {db} from '../../services/firebase'
import firebase from 'firebase'
import moment from 'moment'

const CreateAsk = (props) => {
    //props
    const shares = props.shares
    const team = props.team
    const user = props.user
    const closeAsk = props.closeAsk

    //states
    const [calc, setCalc] = useState('')
    const [showShare, setShowShare] = useState(true)
    const [showPrice, setShowPrice] = useState(false)
    const [askPrice, setAskPrice] = useState()
    const [askSharesAmount, setAskSharesAmount] = useState()
    const [numAvailableShares, setNumAvailableShares] = useState(0)
    const [availableShares, setAvailableShares] = useState([])

    const sharesHold = []

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
                setAskSharesAmount(parseFloat(thisNum))
                setCalc(thisNum)
            }else if(showPrice){
                let hold = calc
                let thisNum = hold.concat(x)
                console.log(thisNum)
                setAskPrice(parseFloat(thisNum))
                setCalc(thisNum)
            }
        }
        
    }

    const deleteDigit = () => {
        if(showShare){
            const editedText = calc.slice(0, -1)
            setAskSharesAmount(parseFloat(editedText))
            setCalc(editedText)
        }else if(showPrice){
            const editedText = calc.slice(0, -1)
            setAskPrice(parseFloat(editedText))
            setCalc(editedText)
        }
        
    }

    function createAsk() {
        let numShares = 0
        let totalPrice = 0
        db.collection('Bids').where('bidTeam', '==', team.team).get().then((snapshot) => {
            snapshot.forEach((doc) => {
              const data = doc.data();
              if(data.email != user.email){
                if(data.bidPrice >= askPrice){
                    numShares++
                    if(numShares <= askSharesAmount){
                        totalPrice = totalPrice + data.bidPrice
                    }
                }
              }
            });
            if(numShares >= askSharesAmount && totalPrice >= (askSharesAmount * askPrice)){
                let stillCreate = window.confirm(`There are enough open bids to fill your order! You can sell your shares for $${(totalPrice/askSharesAmount).toFixed(2)} per share. Would you still like to create the offer to sell?`)
                if(stillCreate){
                    if(availableShares.length >= askSharesAmount){ //if you have enough shares available to offer 
                        var batch = db.batch()
                        for(let i = 0; i < askSharesAmount; i++){ //gets the right number
                            let share = availableShares[i] //going through the array
                            
                            let thisRef1 = db.collection('Asks').doc(`${share}-${user.email}`)
                            batch.set(thisRef1, { //creates a doc in Asks DB
                                askPrice: parseFloat(askPrice),
                                askOwner: user.email,
                                askShare: share,
                                team: team.team,
                                subscription: user.subscription,
                                askNum: i,
                                time: firebase.firestore.Timestamp.now(),
                                date: today
                            })
                            let thisRef2 = db.collection('Shares').doc(share)
                            batch.update(thisRef2, {
                                onTradingBlock: true,
                                currentAsk: parseFloat(askPrice)
                            })
                            let thisRef3 = db.collection('Teams').doc(team.team)
                            batch.update(thisRef3, {
                                asksAvailable: firebase.firestore.FieldValue.increment(1),
                                totalAskPrice: firebase.firestore.FieldValue.increment(parseFloat(askPrice)),
                                //lowestAskPrice: parseFloat(askPrice) < firebase.firestore.FieldValue  ?  firebase.firestore.FieldValue : parseFloat(askPrice) 
                            })
                        }
                        batch.commit().then(()=> {
                            alert(`You created an offer to sell ${askSharesAmount} shares for a price per share of $${askPrice}`)
                            window.location.href = "http://simbull.app";
                        }).catch((error) => console.log(error));
                    }
                    else{alert('you dont have enough shares or your shares are already in an offer to sell')}
                }
            }
            else{
                let answer = window.confirm(`Do you want to create an offer to sell ${askSharesAmount} shares for a price per share of $${askPrice}?`)
                if(answer){
                    console.log(availableShares)
                    if(availableShares.length >= askSharesAmount){ //if you have enough shares available to offer 
                        var batch = db.batch()
                        for(let i = 0; i < askSharesAmount; i++){ //gets the right number
                            let share = availableShares[i] //going through the array
                            let thisRef1 = db.collection('Asks').doc(`${share}-${user.email}`)
                            batch.set(thisRef1, { //creates a doc in Asks DB
                                askPrice: parseFloat(askPrice),
                                askOwner: user.email,
                                askShare: share,
                                team: team.team,
                                subscription: user.subscription,
                                askNum: i,
                                time: firebase.firestore.Timestamp.now(),
                                date: today
                            })
                            let thisRef2 = db.collection('Shares').doc(share)
                            batch.update(thisRef2, {
                                onTradingBlock: true,
                                currentAsk: parseFloat(askPrice)
                            })
                            let thisRef3 = db.collection('Teams').doc(team.team)
                            batch.update(thisRef3, {
                                asksAvailable: firebase.firestore.FieldValue.increment(1),
                                totalAskPrice: firebase.firestore.FieldValue.increment(parseFloat(askPrice)),
                                //lowestAskPrice: parseFloat(askPrice) < firebase.firestore.FieldValue  ?  firebase.firestore.FieldValue : parseFloat(askPrice) 
                            })
                        }
                        batch.commit().then(()=> {
                            alert(`You created an offer to sell ${askSharesAmount} shares for a price per share of $${askPrice}`)
                            console.log(availableShares)
                            window.location.href = "http://simbull.app";
                        }).catch((error) => console.log(error));
                    }
                    else{alert('you dont have enough shares or your shares are already in an offer to sell')}
                    //cycle through bids to see if you can fill any of them
                }
            }
            
          })
          .catch((error) => console.log(error));
    }
    const getTeamShares = () => {
        user.shares.map(s => {
            let sL = s.length
            let newS = s.substring(0, sL - 4)
            if(newS == team.team){sharesHold.push(s)}
        })
        getAskAvailability()
        return(sharesHold.length)
    }
    function getAskAvailability() {
            console.log(sharesHold)
            let nas = 0
            let availableShares1 = []
            sharesHold.map(t => {
                db.collection('Shares').doc(t).get().then((doc) => {
                        const data = doc.data()
                        console.log(data)
                        if(data.onTradingBlock == false){
                            availableShares1.push(t)
                            nas = nas + 1
                        } 
                        console.log(nas)
                })
                setAvailableShares(availableShares1)
                setNumAvailableShares(nas)
                return nas
            })
    }
    useEffect(() => {
        getTeamShares()
    }, [askSharesAmount])

    return(
        <div className="TradePopup">
            <div className="SellShare">
                <Link onClick={closeAsk}><i className="fa fa-times-circle"></i></Link>
                <div className="ss-title">Offer to Sell</div>
                <div className='ss-team'>
                    <img className="ss-img"  src={`nba_jersey/${team.team}.png`} alt='team' />
                    <span className="tc-name-sim">sim</span>{team.team}
                </div>
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
                <div className='ss-shares'>You own {shares} shares</div>
                {showShare && <div className="ss-shareAmt"><span className="ss-share-label">Shares:</span> <span className="ss-shareAmt-underline">{calc ? calc : '0'}</span></div>}
                {showPrice && <div className="ss-shareAmt"><Link onClick={()=>{setShowPrice(false);setShowShare(true);setCalc('');setAskPrice();setAskSharesAmount()}}><i className="fa fa-undo"></i></Link><span className="ss-share-label">Price:</span> <span className="ss-shareAmt-underline">{calc ? calc : '0.00'}</span></div>}
                <div className="ss-btn-div">
                    {showShare && <><div className="center center-function"><button className="ss-submit" onClick={()=>{setShowPrice(true);setShowShare(false);setCalc('')}}>Next</button></div></>}
                    {showPrice && <><div className="center center-function"><button className="ss-submit" onClick={createAsk}>Create Offer to Sell</button></div></>}
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

export default CreateAsk