import React, {useState, useEffect} from 'react'
import './functions.css'
import {Link} from 'react-router-dom'
import { db } from '../../services/firebase'
import firebase from 'firebase'
import moment from 'moment'

const BuyShare = (props) => {
    //props
    const team = props.team
    const user = props.user
    const closeBuy = props.closeBuy

    //states
    const [calc, setCalc] = useState('')
    const [buyShares, setBuyShares] = useState(0)
    const [asksArr1, setAsksArr1] = useState([])

    //let buyShares = 0
    let maxBuy = 7

    let totalCost 
    let shareCost
    let tradingCost = 0
    let avgCost
    let newLowestAskPrice = 9999
    //let asksArr1 = []

    //Functionality
    //calc add digit
    const addDigit = (x) => {
        let hold = calc
        let thisNum = hold.concat(x)
        setBuyShares(parseFloat(thisNum))
        setCalc(thisNum)
        console.log(buyShares)
        console.log(typeof buyShares)
    }

    const deleteDigit = () => {
        const editedText = calc.slice(0, -1)
        setBuyShares(parseFloat(editedText))
        setCalc(editedText)
        
    }

    const submitBuy = () => {
        console.log(buyShares)
        let buyShareInt = parseInt(buyShares)
        if(asksArr1.length>0){shareCost = asksArr1[0].askPrice}
        if(asksArr1.length>= buyShares){
            for(let i = 1; i<buyShares; i++){
                shareCost = shareCost + asksArr1[i].askPrice
            }
            if(!user.subscription){tradingCost = 1}
            avgCost = shareCost / buyShares
            totalCost = shareCost + tradingCost
        }
        let count = 0
            user.shares.map(s => {
                let share = s.substring(0, s.length - 4)
                if(share == team.team){
                    count++
                }
            })
            let buyAmt = 7 - count
            maxBuy = buyAmt
        if(buyShareInt == buyShares  && buyShares !== 0){
            if(asksArr1.length + 1 > buyShares){
                if(totalCost <= user.cash){
                    if(buyShares<=maxBuy){
                        let answer = window.confirm(`Are you sure you want to buy ${buyShares} shares for an average cost of $${avgCost.toFixed(2)} per share, for a total of $${totalCost.toFixed(2)}? ${tradingCost != 0 ? `Includes a trading fee of $${tradingCost.toFixed(2)}`: ''}`)
                        if(answer){
                            alert(`You bought ${buyShares} shares for an average cost of $${avgCost.toFixed(2)} per share, for a total of $${totalCost.toFixed(2)}`)
                            uploadingByAsk()
                        }
                        else{
                            resetIt()
                        }
                    }
                    else{
                        alert(`Sorry, you can only own 7 shares of a specific team at the moment. ${maxBuy === 0 ? 'Since, you already own 7, it is not possible to buy more. We apologize for the inconvenience.' : `It is possible to buy ${maxBuy} more share(s).`}`)
                        resetIt() 
                    }
                }else{
                    alert(`You don't have enough cash`)
                    console.log(totalCost)
                    resetIt()
                }
            }else{
                alert(`Not enough available shares. There are only ${asksArr1.length} shares available.`)
                resetIt()
            }
        }
        else{
            alert(`Sorry we don't do fractional trading. Please try again with a whole number.`)
            resetIt()
        }
    }
    
    const getTotalCost = () => {
        if(asksArr1.length>0){shareCost = asksArr1[0].askPrice}
        if(asksArr1.length>= buyShares){
            for(let i = 1; i<buyShares; i++){
                shareCost = shareCost + asksArr1[i].askPrice
            }
            if(!user.subscription){tradingCost = 1}
            avgCost = shareCost / buyShares
            totalCost = shareCost + tradingCost
        }
    }
    useEffect(() => {
        getTotalCost()
    }, [buyShares, asksArr1])

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
            maxBuy = buyAmt
        }
    }
    useEffect(() => {
        checkShareAmt()
    }, [user])

    function uploadingByAsk(){
        let transactionNum = (`000000000000${(Math.random() * 100000000000).toFixed(0)}`)
        let transactionID = transactionNum.substring(transactionNum.length - 10, transactionNum.length)
        var batch = db.batch()
        for(let i = 0; i<buyShares; i++){
            if(!asksArr1[i].subscription){
                let num = asksArr1[i].askNum
                if(num == 0){
                    let thisRef7 = db.collection('Users').doc(asksArr1[i].askOwner)
                    batch.update(thisRef7,{
                        cash: firebase.firestore.FieldValue.increment(-tradingCost)
                    })
                }
            }
            let thisRef1 = db.collection('Shares').doc(asksArr1[i].askShare)
            batch.update(thisRef1, {
                currentAsk: null,
                lastSoldPrice: asksArr1[i].askPrice,
                onTradingBlock: false,
                owner: user.email,
                totalPayouts: 0
            })
            let thisRef2 = db.collection('Users').doc(asksArr1[i].askOwner)
            batch.update(thisRef2, {
                cash: firebase.firestore.FieldValue.increment(asksArr1[i].askPrice),
                shares: firebase.firestore.FieldValue.arrayRemove(asksArr1[i].askShare)
            })
            let thisRef3 = db.collection('Users').doc(user.email)
            batch.update(thisRef3, {
                shares: firebase.firestore.FieldValue.arrayUnion(asksArr1[i].askShare)
            })
            let thisRef4 = db.collection('Asks').doc(`${asksArr1[i].askShare}-${asksArr1[i].askOwner}`)
            batch.delete(thisRef4)
            let newYearHigh = team.yearHigh > asksArr1[i].askPrice ? team.yearHigh : asksArr1[i].askPrice
            let newYearLow = team.yearLow < asksArr1[i].askPrice ? team.yearLow : asksArr1[i].askPrice
            let thisRef5 = db.collection('Teams').doc(team.team)
            batch.update(thisRef5, {
                asksAvailable: firebase.firestore.FieldValue.increment(-1),
                totalAskPrice: firebase.firestore.FieldValue.increment(parseFloat(-asksArr1[i].askPrice)),
                lastSoldPrice: asksArr1[i].askPrice,
                yearHigh: newYearHigh,
                yearLow: newYearLow
            })
            let date = moment().format('YYYYMMDD')
            let thisRef8 = db.collection('Transactions').doc(`${date}-${asksArr1[i].askShare}-seller:${asksArr1[i].askOwner}-buyer:${user.email}-price:${asksArr1[i].askPrice}`)
            batch.set(thisRef8, {
                seller: asksArr1[i].askOwner,
                buyer: user.email,
                price: asksArr1[i].askPrice,
                date: date,
                time: firebase.firestore.Timestamp.now(),
                sellerFee: !asksArr1[i].subscription,
                buyerFee: !user.subscription,
                share: asksArr1[i].askShare,
                transactionID: transactionID,
                type: 'buy',
                oldPrice: team.lastSoldPrice
            })
        }
        let thisRef6 = db.collection('Users').doc(user.email)
        batch.update(thisRef6, {
            cash: firebase.firestore.FieldValue.increment(-totalCost),
        })
        batch.commit().then(()=> {
            return window.location.href = "http://simbull.app";
        }).catch((error) => console.log(error));
    }

    const resetIt = () => {
        //setBuyShares()
        setBuyShares(0)
        totalCost = 0
        avgCost = 0
        newLowestAskPrice = 0
    }
    const checkAsks = () => {
        function compare(a, b) {
            return a.askPrice - b.askPrice;
          }
        
        db.collection('Asks').where('team', '==', team.team)
            .onSnapshot(querySnapshot => {
                let asksArr = []
                querySnapshot.forEach(function(doc) {
                    const data = doc.data()
                    if(user.email != data.askOwner){
                        asksArr.push(data)
                    }    
                });  
                asksArr.sort(compare);
                setAsksArr1(asksArr)
                console.log(asksArr1)
            })
            
    }

    useEffect(() => {
        checkAsks()
    }, [])

    return(
        <div className="TradePopup">
            <div className="SellShare">
                <Link onClick={closeBuy}><i className="fa fa-times-circle"></i></Link>
                <div className="ss-title">Buy</div>
                <div className='ss-team'><img className="ss-img"  src={`nba_jersey/${team.team}.png`} alt='team' /><span className="tc-name-sim">sim</span>{team.team}</div>
                <div className='ss-cash'>Cash Available: ${user.cash && user.cash.toFixed(2)}</div>
                <div className="ss-shareAmt underline">{calc ? calc : '0'}</div>
                <div className="ss-btn-div">
                    <div className="center center-function"><button className="ss-submit" onClick={submitBuy}>Buy</button></div>
                    <button className="ss-btn" onClick={()=>{addDigit("1")}}>1</button>
                    <button className="ss-btn" onClick={()=>{addDigit("2")}}>2</button>
                    <button className="ss-btn" onClick={()=>{addDigit("3")}}>3</button>
                    <button className="ss-btn" onClick={()=>{addDigit("4")}}>4</button>
                    <button className="ss-btn" onClick={()=>{addDigit("5")}}>5</button>
                    <button className="ss-btn" onClick={()=>{addDigit("6")}}>6</button>
                    <button className="ss-btn" onClick={()=>{addDigit("7")}}>7</button>
                    <button className="ss-btn" onClick={()=>{addDigit("8")}}>8</button>
                    <button className="ss-btn" onClick={()=>{addDigit("9")}}>9</button>
                    <button className="ss-btn" onClick={()=>{addDigit("0")}}>0</button>
                    <button className="ss-btn-2" onClick={()=>{deleteDigit()}}><i className="fa fa-arrow-left"></i></button>
                </div>
            </div> 
        </div>
    )
}

export default BuyShare