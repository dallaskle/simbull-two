import React, {useState, useEffect} from 'react'
import './functions.css'
import {Link} from 'react-router-dom'
import {db} from '../../services/firebase'
import firebase from 'firebase'
import moment from 'moment'

const SellShare = (props) => {
    //props
    const shares = props.shares
    const team = props.team
    const user = props.user
    const closeSell = props.closeSell


    //states
    const [calc, setCalc] = useState('')

    let totalCost = 0
    let shareCost = 0
    let tradingCost = 0
    let newHighestBidPrice = 0

    const [sharesToSell, setSharesToSell] = useState([])
    const [sellShares, setSellShares] = useState()
    const handleSellShares = (e) => {setSellShares(e.target.value)}
    const [bidsArr, setBidsArr] = useState([])
    useEffect(() => {getBids()}, [props.bidsArr])
    const [amountSharesToSell, setAmountSharesToSell] = useState(0)

    //Functionality
    //calc add digit
    const addDigit = (x) => {
        let hold = calc
        let thisNum = hold.concat(x)
        setSellShares(parseFloat(thisNum))
        setCalc(thisNum)
    }

    const deleteDigit = () => {
        const editedText = calc.slice(0, -1)
        let thisNum = parseFloat(editedText)
        setSellShares(thisNum)
        setCalc(editedText)
    }

    function getBids() {
        if(props.bidsArr){
            const bidOwners = []
            const bidOwnersBidsAmt = {}
            const ownersCashAmt = {}
            //get bid owners and thier total bid amount
            props.bidsArr.map( b => {
                if(user.email !== b.bidOwner){
                    if (bidOwnersBidsAmt[b.bidOwner]) {
                        bidOwnersBidsAmt[b.bidOwner] = bidOwnersBidsAmt[b.bidOwner] + b.bidPrice;
                    } 
                    else {
                        bidOwnersBidsAmt[b.bidOwner] = b.bidPrice;
                        bidOwners.push(b.bidOwner)
                        console.log(b.bidOwner)
                    }
                }
            })
            console.log(bidOwners)
            console.log(bidOwnersBidsAmt)
            //get bid owners total cash
            db.collection('Users').get().then((snapshot) => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                    console.log(bidOwners)
                    if(bidOwners.includes(data.email.toString())){
                        console.log('here')
                        console.log(ownersCashAmt)
                        if(!ownersCashAmt[data.email]){
                            ownersCashAmt[data.email] = data.cash
                        }
                    }
                    console.log(data.email)
                    console.log(ownersCashAmt[data.email])
                    console.log(ownersCashAmt[data.cash])
                }, error => {console.log(error)})
                console.log('there')
                console.log(ownersCashAmt)
                return ownersCashAmt
            }).then((result) => {
                //eliminating users from bidOwners Array if they don't have enough cash to cover their bids 
                bidOwners.map( o => {
                    if(bidOwnersBidsAmt[o] >  ownersCashAmt[o]){
                    let ind = bidOwners.indexOf(o)
                    bidOwners.splice(ind, 1)
                    }
                })
                return bidOwners
            }).then((result) => {
                //repopulating the bids array with bids only from users with enough cash
                const bids1 = []
                props.bidsArr.map(b => {
                if(bidOwners.includes(b.bidOwner)){
                    bids1.push(b)
                }
                })   
                console.log(bids1) 
                setBidsArr(bids1)
            })
            
        }
    }

    const getTotalCost = () => {
        totalCost = 0
        shareCost = 0
        if(bidsArr.length > 0 & bidsArr.length>= sellShares){
            for(let i = 0; i < sellShares; i++){
                let holder = shareCost + bidsArr[i].bidPrice
                shareCost = holder
            }
            if(!user.subscription){
                tradingCost = 1
            }
            totalCost = shareCost - tradingCost
        }

    }
    useEffect(() => {getTotalCost()}, [sellShares])
    const getSharesToSell = () => {
        const sharesToSell1 = []
        user.shares.map(s => {
            if(s.substring(0, s.length-4) == team.team){
                sharesToSell1.push(s)
            }
        })
        setSharesToSell(sharesToSell1)
    }
    useEffect(() => {getSharesToSell()}, [props.bidsArr])

    const submitSell = () => {
        let sellSharesInt = parseInt(sellShares)
        if(sellShares == sellSharesInt){
            if(amountSharesToSell<sellShares){
                alert(`You don't own enough shares. You only own ${amountSharesToSell} shares.`)
            }
            else{
                if(bidsArr.length >= sellShares & sellShares != 0){
                    let answer = window.confirm(`Sell ${sellShares} shares for $${shareCost/sellShares} per share, for a total of $${totalCost}? ${!user.subscription ? `Includes a trading fee of $${tradingCost.toFixed(2)}.` : ''}`)
                    if(answer){
                        uploadByBid()
                    }
                }
                else{
                    alert(`There are not enough open bids to fill your order. Please try a smaller order or make an offer to sell. There are only ${bidsArr.length} available. `)
                }
            }
        }
        else{
            alert(`Sorry we don't do fractional trading. Please try again with a whole number.`)
        }
        
    }

    const checkForShares = () =>{
        let sharesOwned = 0
        user.shares.map(s => {
            let newS = s.substring(0, s.length - 4)
            if(newS == team.team){
                sharesOwned++
            }
        })
        setAmountSharesToSell(sharesOwned)
    }
    useEffect(() => {
        checkForShares()
    }, [props.user])

    async function uploadByBid() {
        let transactionNum = (`000000000000${(Math.random() * 100000000000).toFixed(0)}`)
        let transactionID = transactionNum.substring(transactionNum.length - 10, transactionNum.length)
        var batch = db.batch()
        for(let i=0; i< sellShares; i++){
            if(!bidsArr[i].subscription){
                let num = bidsArr[i].bidNum
                if(num == 0){
                    let thisRef7 = db.collection('Users').doc(bidsArr[i].bidOwner)
                    batch.update(thisRef7,{
                        cash: firebase.firestore.FieldValue.increment(-tradingCost)
                    })
                }
            }
            let thisRef1 = db.collection('Shares').doc(sharesToSell[i])
            batch.update(thisRef1,{
                currentAsk: null,
                lastSoldPrice: bidsArr[i].bidPrice,
                owner: bidsArr[i].bidOwner,
                onTradingBlock: false,
                totalPayouts: 0
            })
            let thisRef2 = db.collection('Users').doc(bidsArr[i].bidOwner)
            batch.update(thisRef2,{
                cash: firebase.firestore.FieldValue.increment(-bidsArr[i].bidPrice),
                shares: firebase.firestore.FieldValue.arrayUnion(sharesToSell[i])
            })
            let thisRef3 = db.collection('Users').doc(user.email)
            batch.update(thisRef3,{
                shares: firebase.firestore.FieldValue.arrayRemove(sharesToSell[i])
            })
            let thisRef4 = db.collection('Bids').doc(`${bidsArr[i].bidTeam}-${bidsArr[i].bidOwner}-$${bidsArr[i].bidPrice}-${bidsArr[i].bidNum}`)
            batch.delete(thisRef4)
            let newYearHigh = team.yearHigh > bidsArr[i].bidPrice ? team.yearHigh : bidsArr[i].bidPrice
            let newYearLow = team.yearLow < bidsArr[i].bidPrice ? team.yearLow : bidsArr[i].bidPrice
            let thisRef5 = db.collection('Teams').doc(team.team)
            batch.update(thisRef5, {
                bidsAvailable: firebase.firestore.FieldValue.increment(-1),
                totalBidPrice: firebase.firestore.FieldValue.increment(parseFloat(-bidsArr[i].bidPrice)),
                lastSoldPrice: bidsArr[i].bidPrice,
                yearHigh: newYearHigh,
                yearLow: newYearLow
            })
            let date = moment().format('YYYYMMDD')
            let thisRef8 = db.collection('Transactions').doc(`${date}-${sharesToSell[i]}-seller:${user.email}-buyer:${user.email}-price:${bidsArr[i].bidPrice}`)
            batch.set(thisRef8, {
                seller: user.email,
                buyer: bidsArr[i].bidOwner,
                price: bidsArr[i].bidPrice,
                date: date,
                time: firebase.firestore.Timestamp.now(),
                sellerFee: !user.subscription,
                buyerFee: !bidsArr[i].subscription,
                share: sharesToSell[i],
                transactionID: transactionID,
                type: 'sell',
                oldPrice: team.lastSoldPrice
            })
        }
        let thisRef6 = db.collection('Users').doc(user.email)
        batch.update(thisRef6, {
            cash: firebase.firestore.FieldValue.increment(totalCost),
        })
        db.collection('Asks').where('team', '==', team.team).where('askOwner', '==', user.email).get().then((snapshot) => {
            const asks1 = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              for(let i = 0; i < sellShares; i++){
                  if(data.askShare == sharesToSell[i]){
                    asks1.push(data);
                  }
              }
            });
            asks1.map(s => {
                let deleteRef = db.collection('Asks').doc(`${s.askShare}-${user.email}`)
                batch.delete(deleteRef)
            })
            batch.commit().then(()=> {
                alert(`You sold ${sellShares} shares for $${totalCost}`)
                window.location.href = "http://simbull.app";
            })
            }).catch((error) => console.log(error))
    }


    return(
        <div className="TradePopup">
            <div className="SellShare">
                <Link onClick={closeSell}><i className="fa fa-times-circle"></i></Link>
                <div className="ss-title">Sell</div>
                <div className='ss-team'><img className="ss-img"  src={`nba_jersey/${team.team}.png`} alt='team' /><span className="tc-name-sim">sim</span>{team.team}</div>
                <div className='ss-shares'>You own {shares} shares</div>
                <div className="ss-shareAmt underline">{calc ? calc : '0'}</div>
                <div className="ss-btn-div">
                    <div className='center center-function'><button className="ss-submit" onClick={submitSell}>Sell</button></div>
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

export default SellShare