import React, {useState, useEffect} from 'react'
import './histories.css'
import {db} from '../../../services/firebase'

const TransferHistory = (props) => {
    const user = props.user

    //states
    const [history, setHistory] = useState([])

    //Functions
    const getHistory = () => {
        const history1 = []
        db.collection('Deposits').where('user', '==', user.email).get().then(qSnap => {
            qSnap.forEach(doc => {
                const data = doc.data()
                history1.push(data)
            })
            setHistory(history1)
        })
    }
    useEffect(()=> {
        getHistory()
    }, [user])

    return(
        <div className="TransferHistory">
            {history.length > 0 && history.map(h => {
                let dateStr
                let newDate
                if(typeof h.date !== 'string'){
                    dateStr = String(h.date)
                    newDate = `${dateStr.substring(4,6)}/${dateStr.substring(6,8)}/${dateStr.substring(0,4)}`
                }
                return(
                     <div className="h-transfer-div">
                        <hr className="h-transfer-hr" />
                        <div className="h-transfer-div-left">
                            <div className="h-transfer-div-type">
                            {h.type === 'withdrawl' ? 'Withdrawl' : 'Deposit'}
                            </div>
                            <div className="h-transfer-div-date">   
                                {typeof h.date === 'string' ? h.date : newDate}
                            </div>
                        </div>
                        <div className={h.type === 'withdrawl' ? "h-transfer-div-right red" : "h-transfer-div-right green"}> 
                            {h.type === 'withdrawl' ? '-' : '+'}${h.amount}
                        </div>
                    </div>
                )
            })}
           
            <hr className="h-transfer-hr" />
        </div>
    )
}

export default TransferHistory