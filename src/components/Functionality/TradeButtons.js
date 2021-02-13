import React, {useState, useRef, useEffect} from 'react'
import './functions.css'
import '../Holdings/TeamCard.css'
import BuyShare from './BuyShare'
import SellShare from './SellShare'
import CreateAsk from './CreateAsk'
import CreateBid from './CreateBid'
import {Overlay, Tooltip} from 'react-bootstrap'
import {db} from '../../services/firebase'

const TradeButtons = (props) => {
    //props
    const shares = props.shares
    const team = props.team
    const user = props.user

    //states
    const [showBuy, setShowBuy] = useState(false)
    const [showSell, setShowSell] = useState(false)
    const [showAsk, setShowAsk] = useState(false)
    const [showBid, setShowBid] = useState(false)
    const [bidsArr, setBidsArr] = useState([])
    

    //Functionality
    const closeSell = () => {setShowSell(false)}
    const closeBuy = () => {setShowBuy(false)}
    const closeBid = () => {setShowBid(false)}
    const closeAsk = () => {setShowAsk(false)}

 
    //Offers buttons
    function Example() {
        const [showOffers, setShowOffers] = useState(false)
        const target = useRef(null);

        const routeOffers = () => {
            if(shares === 0){
                setShowBid(true)
            }else{
                setShowOffers(true)
            }
        }
      
        return (
          <>
            <button onClick={routeOffers} ref={target} className="te-function-btn">Offer</button>
            <Overlay target={target.current} show={showOffers} placement="top">
              {(props) => (
                <Tooltip  id="overlay-example" {...props}>
                    <div className='trade-offer-btns-div'>
                        <button className="trade-offer-btns" onClick={()=>{return setShowAsk(true)}} name='Ask' value={showAsk}>Offer To Sell</button>
                        <button className="trade-offer-btns" onClick={()=>{return setShowBid(true)}} name='Bid' value={showBid}>Offer To Buy</button>
                    </div>
                </Tooltip>
              )}
            </Overlay>
          </>
        );
    }

    //get bids for sell share
    const getBids = () => {
        let bidsArr1 = []
        db.collection('Bids').where('bidTeam', '==', team.team).onSnapshot(snapshot => {
            bidsArr1 = []
            snapshot.forEach(doc => {
                const data = doc.data()
                bidsArr1.push(data)
            })
            bidsArr1.sort(function compare(a, b) {
                return b.bidPrice - a.bidPrice;
            })
            console.log(bidsArr1)
            return setBidsArr(bidsArr1)
        })   
    }
    useEffect(() => {getBids()}, [props])

    //Turn off Scrolling

    return(
        <div className={showBuy || showSell || showAsk || showBid ?"TradeButtons noScroll":"TradeButtons"}>
            <div className="te-function-div">
                <button onClick={()=>{return setShowBuy(true)}} className="te-function-btn">Buy</button>
                <Example />
                <button onClick={()=>{return setShowSell(true)}} className="te-function-btn">Sell</button>
            </div>
            {showBuy && <BuyShare team={team} user={user} closeBuy={closeBuy} />}
            {showSell && <SellShare shares={shares} team={team} user={user} bidsArr={bidsArr} closeSell={closeSell} />}
            {showAsk && <CreateAsk shares={shares} team={team} user={user} closeAsk={closeAsk} />}
            {showBid && <CreateBid team={team} user={user} closeBid={closeBid}  />}
        </div>
    )
}

export default TradeButtons