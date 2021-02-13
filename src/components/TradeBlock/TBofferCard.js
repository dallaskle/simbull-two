import React, {useState, useEffect} from 'react'
import './tradeblock.css'

const TBofferCard = (props) => {
    //props
    const o = props.o

    //state
    const [price, setPrice] = useState(0)
    const [team, setTeam] = useState()

    const getPrice = () => {
        if(props.teams){
            props.teams.map(t => {
                if(o.bidTeam){
                    setTeam(o.bidTeam)
                    if(t.team === o.bidTeam){
                        setPrice(t.lastSoldPrice)
                        
                    }
                }else{
                    setTeam(o.team)
                    if(t.team === o.team){
                        setPrice(t.lastSoldPrice)
                    }
                }
            })
        }
    }
    useEffect(() => {
        getPrice()
    }, [])

    return(
        <div className="TBtradeCard">
            {props.o && <><div className="tb-tc-img-div" ><img className="tb-tc-img"  src={`nba_jersey/${o.bidTeam ? o.bidTeam : o.team}.png`} alt='team' /></div>
            <div className="tb-tc-name2"><span className="tc-name-sim">Sim</span>{o.bidTeam ? o.bidTeam : o.askShare.substring(0, o.askShare.length - 4)}</div>
            <div className='tb-tc-info'>
                <div className="tb-tc-offerprice"><span className={o.bidTeam ? "black-white bid-back" : "black-white ask-back"}>{o.bidTeam ? `Bid: $${o.bidPrice.toFixed(2)}` :  `Ask: $${o.askPrice.toFixed(2)}`}</span></div>
                <div className="tb-tc-current">Current: ${price.toFixed(2)}</div>
                <div className="tb-o-date">{`${o.date.substring(4, 6)}/${o.date.substring(6, 8)}/${o.date.substring(0, 4)}`}</div>
            </div></>}
        </div>
    )
}

export default TBofferCard