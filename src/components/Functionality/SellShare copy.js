import React, {useState} from 'react'
import './functions.css'
import {Link} from 'react-router-dom'

const SellShare = (props) => {
    //props
    const shares = props.shares
    const team = props.team
    const user = props.user
    const closeSell = props.closeSell

    //states
    const [calc, setCalc] = useState('')

    //Functionality
    //calc add digit
    const addDigit = (x) => {
        let hold = calc
        console.log(hold)
        setCalc(hold.concat(x))
    }

    const deleteDigit = () => {
        const editedText = calc.slice(0, -1)
        setCalc(editedText)
    }

    return(
        <div className="TradePopup">
            <div className="SellShare">
                <Link onClick={closeSell}><i className="fa fa-times-circle"></i></Link>
                <div className="ss-title">Sell</div>
                <div className='ss-team'><img className="ss-img"  src={`nba_jersey/${team.team}.png`} alt='team' /><span className="tc-name-sim">sim</span>{team.team}</div>
                <div className='ss-shares'>You own {shares} shares</div>
                <div className="ss-shareAmt">{calc ? calc : '0'}</div>
                <div className="ss-btn-div">
                    <button className="ss-submit">Sell</button><br />
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