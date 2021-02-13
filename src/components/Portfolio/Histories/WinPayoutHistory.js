import React, {useState, useEffect} from 'react'
import './histories.css'
import {db} from '../../../services/firebase'

const WinPayoutHistory = (props) => {
    //props
    const user = props.user

    //states
    const [payouts, setPayouts] = useState([])

    //Functions
    const getPayouts = () => {
        if(payouts.length === 0){
            const payoutsArr = []
            db.collection('Payouts').where('payoutUser', '==', user.email).get().then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data()
                    payoutsArr.push(data)
                })
                payoutsArr.sort(function(a, b) {
                    return b.date - a.date;
                });
                setPayouts(payoutsArr)
            })
        }
    }
    useEffect(() => {
        getPayouts()
    }, [])

    return(
        <div className="WinPayoutHistory">

            {payouts.length > 0 && payouts.map(p => {
                return(
                    <div className="h-wp-div">
                        <hr className="h-wp-hr" />
                        <div className="h-wp-div-left">
                            <div className="h-wp-div-type">
                                Sim{p.share.substring(0, p.share.length - 4)}
                            </div>
                            <div className="h-wp-div-date">   
                                {`${p.date.substring(4, 6)}/${p.date.substring(6, 8)}/${p.date.substring(0, 4)}`}
                            </div>
                        </div>
                        <div className="h-wp-div-right green"> 
                            +${p.payoutAmount.toFixed(2)}
                        </div>
                    </div>
                )
            })}
            
            <hr className="h-wp-hr" />
        </div>
    )
}

export default WinPayoutHistory