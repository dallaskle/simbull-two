import React, {useState, useEffect} from 'react'
import './Holdings.css'
import {Link} from 'react-router-dom'
import { db } from '../../services/firebase'
import firebase from 'firebase'

const OpenAsks = (props) => {
    //props
    const user = props.user
    const teams = props.teams

    //states
    const [myAsks, setMyAsks] = useState([])
    const [asksLoaded, setAsksLoaded] = useState(false)
    const [myAsksInd, setMyAsksInd] = useState([])
    const [show, setShow] = useState(false)

    //Functionality
    const getMyAsks = async () => {
        if(show && !asksLoaded){
            if(user !== 0){
                const myAsks1 = []
                const myAsks2 = []
                const myAsksTeams =[]
                await db.collection('Asks').where('askOwner', '==', user.email).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data()
                        myAsks1.push(data)
                        if(!myAsksTeams.includes(data.team)){
                            myAsksTeams.push(data.team)
                        }
                    })
                    myAsksTeams.map(x=> {
                        let thisTeam
                        let thisAskPrice = 0
                        let thisAskNumOfShares = 0
                        let thisAskShare =[]
                        let thisTeamLowestAskPrice
                        myAsks1.map(a => {
                            if(a.team == x){
                                thisTeam = x
                                thisAskPrice = thisAskPrice + a.askPrice
                                thisAskNumOfShares = thisAskNumOfShares + 1
                                thisAskShare.push(a.askShare)
                            }
                        })
                        myAsks2.push({
                            team: thisTeam,
                            askPrice: thisAskPrice/thisAskNumOfShares,
                            askNumOfShares: thisAskNumOfShares,
                            askShares: thisAskShare,
                        })
                    })
                    setMyAsksInd(myAsks1)
                    setMyAsks(myAsks2)
                })
                setAsksLoaded(true)
            }
        }
    }
    useEffect(() => {
        getMyAsks()
    }, [show])

    const showAsks = () => {
        async function deleteAsks(l){
            alert(`Your asks are being deleted`)
            let last = 0
            let thisNumOfAsks 
            let thisAvgAskPrice 
            teams.map(t => {
                if(t.team == l.team){
                    thisNumOfAsks = t.asksAvailable
                    thisAvgAskPrice = t.avgAskPrice
                }
            })
            var batch = db.batch()
            myAsksInd.map(s => {
                if(s.team == l.team){
                    let thisRef1 = db.collection('Asks').doc(`${s.askShare}-${user.email}`)
                    batch.delete(thisRef1)
                    let thisRef2 = db.collection('Shares').doc(s.askShare)
                    batch.update(thisRef2, {
                        currentAsk: null,
                        onTradingBlock: false
                    })
                    let newNumOfAsks = thisNumOfAsks - l.askNumOfShares
                    last++
                    if(last = myAsksInd.length){
                        let thisRef3 = db.collection('Teams').doc(l.team)
                        batch.update(thisRef3, {
                            asksAvailable: newNumOfAsks,
                            totalAskPrice: firebase.firestore.FieldValue.increment(-(l.askNumOfShares * l.askPrice)),
                        })
                    }
                }
            })
            batch.commit().then(() => {alert('Deleted!')}).catch((error) => console.log(error));
            setMyAsks(myAsks.filter(x => {return(x.team != l.team)}))
        }
        return(
        myAsks.map(l => {
            return(
                <div className="holdings-offers-team-div" key={l.team}>
                    <div className="holdings-offers-team-name"> <span className='offers-orange-ask'>Ask</span><span className="tc-name-sim">Sim</span>{l.team}</div>
                    <div className="holdings-offers-team-right">
                        <span className="holdings-offers-team-info">{`${l.askNumOfShares} x $${l.askPrice.toFixed(2)}`}</span> 
                        <button className="holdings-offers-team-btn" onClick={()=>{deleteAsks(l)}}>cancel</button>
                    </div> 
               </div>
            )
        })
        )
    }

    return(
        <div className="OpenAsks">
            <div className="holdings-offers-div"><Link onClick={()=>{setShow(!show)}} className={asksLoaded ? "blk-txt" : ''} to="#">{show ? '' : 'Open'} Offers to Sell</Link></div>
                {asksLoaded && show && showAsks()}
                {myAsks.length == 0 && show && asksLoaded && <div className="Portfolio-Team-Name">You have no current offers to sell</div>}
        </div>
    )
}

export default OpenAsks