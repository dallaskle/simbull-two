import React, {useState, useEffect} from 'react'
import './portfolio.css'
import {db} from '../../services/firebase'
import firebase from 'firebase'

const Bonus = (props) => {

    //props
    const user = props.user

    //states
    const [show, setShow] = useState(false)
    const [bonus, setBonus] = useState(0)
    const [needed, setNeeded] = useState(0)

    //Functionality
    const getBonus = () => {
        db.collection('Affiliates').doc(user.code).get().then(doc => {
            if(doc.exists){
                const data = doc.data()
                setBonus(parseFloat(data.bonus))
                setNeeded(parseFloat(data.needed))
            }
        })
    }
    useEffect(() => {
        if(user.code){
            getBonus()
        }
    }, [user.code])

    //Add Bonus
    const addBonus = () => {
        db.collection('Users').doc(user.email).update({
            cash: firebase.firestore.FieldValue.increment(bonus),
            bonusesReceived: firebase.firestore.FieldValue.increment(bonus)
        }).then(alert(`$${bonus} Bonus Collected!`))
    }


    return( 
        <div className="Bonus">
            {!show && <button onClick={()=>{return setShow(true)}} className="bonus-btn">Collect Deposit Bonus</button>}
            {show && user.currentMoneyDeposited === 0 && bonus !==0 && <>
                <div className="collect-bonus-div">
                    Deposit ${needed} to get a bonus of ${bonus}!
                </div>
            </>}
            {show && user.currentMoneyDeposited === 0 && bonus === 0 && <>
                <div className="collect-bonus-div">
                    Sorry you have an invalid code.
                </div>
            </>}
            {show && user.currentMoneyDeposited >= needed && bonus !==0 && <>
                <div className="collect-bonus-div">
                    <button onClick={getBonus()} className="collect-bonus-btn">Collect a Bonus of ${bonus.toFixed(2)}</button>
                </div>
            </>}
            {show && user.currentMoneyDeposited < needed && user.currentMoneyDeposited !== 0 && bonus !==0 && <>
                <div className="collect-bonus-div">
                    Deposit ${user.currentMoneyDeposited - needed} more to collect your ${bonus} bonus
                </div>
            </>}
            {show && user.currentMoneyDeposited >= needed && bonus === 0 && <>
                <div className="collect-bonus-div">
                    Sorry, you have an invalid code.
                </div>
            </>}
        </div>
    )
}

export default Bonus