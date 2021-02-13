import React, {useState, useEffect} from 'react'
import './portfolio.css'
import {db, firebaseAnalytics} from '../../services/firebase'
import firebase from 'firebase'

const CollectPayouts = (props) => {
    //props
    const user = props.user

    //states
    const [payouts, setPayouts] = useState([])
    const [total, setTotal] = useState(0)
    const [nbaAmt, setNbaAmt] = useState(0)
    const [nflAmt, setNflAmt] = useState(0)

    //Functionality
    const getUncollectedPayouts = () => {
        if(user.email){
            const payouts1 = []
            let holder = 0
            let nba = 0
            let nfl = 0
            db.collection('Payouts').where('payoutUser', '==', user.email).where('collected', '==', false).get().then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                    payouts1.push(data)
                    holder = holder + data.payoutAmount
                    data.payoutAmount === 0.1 ? nba = nba + 0.1 : nfl = nfl + 0.5
                })
                console.log('payouts')
                console.log(payouts1)
                setPayouts(payouts1)
                setTotal(holder)
                setNbaAmt(nba)
                setNflAmt(nfl)
            })
        }
    }
    useEffect(() => {
        getUncollectedPayouts()
    }, [user])

    const collectPayouts = () => {
        let watch = document.getElementById('watch').checked
        let follow = document.getElementById('follow').checked
        let checked = document.getElementById('checked').checked
        let nope = document.getElementById('nope').checked
        let date = Date.now()
        let batch = db.batch()
        let userRef =  db.collection('Users').doc(user.email)
        batch.update(userRef, {
                cash: firebase.firestore.FieldValue.increment(total), 
                totalPayouts: firebase.firestore.FieldValue.increment(payouts.length),
                nflPayouts: firebase.firestore.FieldValue.increment(nflAmt / 0.5),
                nbaPayouts: firebase.firestore.FieldValue.increment(nbaAmt / 0.1),
                uncollectedPayouts: firebase.firestore.FieldValue.increment(-payouts.length)
        })
        let feedbackRef = db.collection('feedback').doc(`${date}-${user.email}`)
        batch.set(feedbackRef, {
            email: user.email,
            date: date,
            watch: watch,
            follow: follow,
            checked: checked,
            nope: nope
        })
        payouts.map(p => {
            if(p.share === "SuperBowl0000"){
                let payoutRef = db.collection('Payouts').doc(`${p.date}-${p.share}-${p.payoutUser}`)
                batch.update(payoutRef, {
                    collected: true
                })
            }
            else{
                if(p.payoutAmount === 0.1){
                    let payoutRef = db.collection('Payouts').doc(`${p.date}-${p.share}-${p.payoutUser}`)
                    batch.update(payoutRef, {
                        collected: true
                    })
                }else if(p.payoutAmount === 0.5){
                    let payoutRef = db.collection('Payouts').doc(`${p.share}-${p.payoutUser}-${p.payoutAmount}-${p.date}`)
                    batch.update(payoutRef, {
                        collected: true
                    })
                }
            }
            
        })
        batch.commit().then(res => {alert(`Win Payouts Collected: ${payouts.length}`); return props.hide()})
        
    }

    useEffect(()=>{
        firebaseAnalytics.logEvent("collectPayouts_visit", {
           user: user && user.email 
        })
    },[])

    return(
        <div className="CollectPayouts">
            <div className="cp-close"><i className="fa fa-times-circle" onClick={props.hide}></i></div>
            <div className="cp-title">Collect Win Payouts</div>
            <div className="cp-title-num">( {payouts.length} )</div>
            <div className="cp-card-holder">
                
                {payouts.length > 0 && payouts.map(p => {
                    return(
                        <div key={`${p.share}-${p.date}-${p.payoutUser}`} className="cp-card-div">
                            <div className="cp-card-left">Sim{p.share.substring(0, p.share.length - 4)} <span className="cp-card-date">{`${p.date.substring(4, 6)}/${p.date.substring(6, 8)}/${p.date.substring(2, 4)}`}</span></div>
                            <div className="cp-card-right green">${p.payoutAmount.toFixed(2)}</div>
                        </div>
                    )
                })}

                <hr className="cp-card-total-hr" />
                <div className="cp-card-total">
                    <div className='cp-card-total-left'>Total</div>
                    <div className='cp-card-total-right'>${total.toFixed(2)}</div>
                    
                </div>

            </div>
            <div className="align-bottom">
                <div className="cp-question-div">
                    <div className="cp-question">
                        Did you watch/follow any of these games?
                    </div>
                    <div className="cp-answers">
                        <input className="cp-answers-input" type="checkbox" id="watch" name="watch" value="watch" />
                        <label className="cp-answers-txt" for="watch"> I watched a game</label><br />
                        <input className="cp-answers-input" type="checkbox" id="follow" name="follow" value="follow" />
                        <label className="cp-answers-txt" for="follow"> I followed a game online</label><br />
                        <input className="cp-answers-input" type="checkbox" id="checked" name="checked" value="checked" />
                        <label className="cp-answers-txt" for="checked"> I checked the score</label><br />
                        <input className="cp-answers-input" type="checkbox" id="nope" name="nope" value="nope" />
                        <label className="cp-answers-txt" for="nope">Nope</label><br />
                    </div>
                </div>
                <div className="cp-card-btn-div"><button onClick={collectPayouts} className="cp-card-btn">Collect Win Payouts</button></div>
            </div>
        </div>
    )
}

export default CollectPayouts