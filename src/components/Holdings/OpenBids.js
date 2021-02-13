import React, {useState, useEffect} from 'react'
import './Holdings.css'
import {Link} from 'react-router-dom'
import {db} from '../../services/firebase'
import firebase from 'firebase'

const OpenBids = (props) => {
    //props
    const user = props.user

    //states
    const [myBids, setMyBids] = useState([])
    const [bidsLoaded, setBidsLoaded] = useState(false)
    const [myBidsInd, setMyBidsInd] = useState([])
    const [updateTeamDb, setUpdateTeamDb] = useState(false)
    const [show, setShow] = useState(false)

    //Funcitonality
    const getMyBids = async () => {
        if(show && !bidsLoaded) {
            if(user !== 0){
                const myBids1 = []
                const myBids2 = []
                const myBidTeams = []
                await db.collection('Bids').where('bidOwner', '==', user.email).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data()
                        myBids1.push(data)
                        if(!myBidTeams.includes(data.bidTeam)){
                            myBidTeams.push(data.bidTeam)
                        }
                    })
                    myBidTeams.map(x=> {
                        let thisTeam 
                        let thisBidPrice = 0
                        let thisBidNumOfShares = 0
                        let last = 0
                        myBids1.map(a => {
                            if(a.bidTeam == x){
                                thisTeam = a.bidTeam
                                thisBidPrice = thisBidPrice + a.bidPrice
                                thisBidNumOfShares++
                            }
                            last++
                            if(last == myBids1.length){
                                myBids2.push({
                                    bidTeam: thisTeam,
                                    bidPrice: thisBidPrice/thisBidNumOfShares,
                                    bidNumOfShares: thisBidNumOfShares,
                                }) 
                            }
                        })
                    })
                    setMyBids(myBids2)
                    setMyBidsInd(myBids1)
                })
                setBidsLoaded(true)
            }
        }
    }
    useEffect(() => {
        getMyBids()
    }, [show])

    const showBids = () => {
        function deleteBid(l) {
           var batch = db.batch()
           myBidsInd.map( x => {
               if(l.bidTeam == x.bidTeam){
                   let thisRef1 = db.collection('Bids').doc(`${x.bidTeam}-${x.bidOwner}-$${x.bidPrice}-${x.bidNum}`)
                   batch.delete(thisRef1)
                   let thisRef2 = db.collection('Teams').doc(l.bidTeam)
                   batch.update(thisRef2, {
                       totalBidPrice: firebase.firestore.FieldValue.increment(-x.bidPrice),
                       bidsAvailable: firebase.firestore.FieldValue.increment(-1),
                   })
               }
           })
           batch.commit().then(() => {alert('Deleted!')}).catch((error) => console.log(error));
           alert(`You are deleting your bids for ${l.bidTeam}. `)
           setMyBids(myBids.filter(x => {return(x.bidTeam != l.bidTeam)}))
       }
       return(
       myBids.map(l => {
           return(
               <div className="holdings-offers-team-div" key={l.bidTeam}>
                    <div className="holdings-offers-team-name"> <span className='offers-blue-bid'>Bid</span><span className="tc-name-sim">Sim</span>{l.bidTeam}</div>
                    <div className="holdings-offers-team-right">
                        <span className="holdings-offers-team-info">{`${l.bidNumOfShares} x $${l.bidPrice.toFixed(2)}`}</span> 
                        <button className="holdings-offers-team-btn" onClick={()=>{deleteBid(l)}}>cancel</button>
                    </div> 
               </div>
           )
       })
       )
    }

    return(
        <>
        <hr />
        <div className="OpenBids">
            <div className="holdings-offers-div"><Link onClick={()=>{setShow(!show)}} className={bidsLoaded ? "blk-txt" : ''} to="#">{show ? '' : 'Open'} Offers to Buy</Link></div>
            {bidsLoaded && show && showBids()}
            {myBids.length == 0 && bidsLoaded && show && <div className="Portfolio-Team-Name">You have no current offers to buy</div>}
        </div>
        </>
    )
}

export default OpenBids