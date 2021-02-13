import React, {useState, useEffect} from 'react'
import './portfolio.css'
import PPayouts from './PPayouts'
import Bonus from './Bonus'

const PTotal = (props) => {

    //get states
    const [user, setUser] = useState()
    const [teams, setTeams] = useState()
    const [value, setValue] = useState(0)
    const [percentReturn, setPercentReturn] = useState(0)

    //Functions
    const loadUser = () => {
        setUser(props.user)
    }
    useEffect(() => {
        loadUser()
    }, [props.user])
    const loadTeams = () => {
        setTeams(props.teams)
    }
    useEffect(() => {
        loadTeams()
    }, [props.teams])

    const getValue = () => {
        if(user){
            let holder = 0
                if(user.shares){
                    let uShares = user.shares
                    for(let i = 0; i < uShares.length; i++){
                        let team = uShares[i].substring(0, uShares[i].length - 4)
                        if(uShares.indexOf(uShares[i]) === i){
                            let count = 0
                            teams !== undefined && teams.map(t => {
                                count++
                                if(count < 63){
                                    if(team === t.team){
                                        holder = holder + t.lastSoldPrice
                                    }
                                } 
                            })
                        }
                    }
                }
            return (holder + user.cash).toFixed(2)
        }
        return 0
    }

    const getPercentReturn = () => {
        return ((((getValue() - (user ? user.currentMoneyDeposited : 0)) / (user ? user.currentMoneyDeposited : 0)) * 100).toFixed(2))
    }


    return(
        <div className='PTotal'>
            <div className="p-total-account">Account Value</div>
            <hr className="p-total-hr" />
            <div className="p-total-value">${getValue()}</div>
            <div className="p-total-cash">Cash: <span className="p-total-cash-amt">${user && user.cash && user.cash.toFixed(2)}</span></div>
            {user && user.code && user.tenure < 22 && user.bonusesReceived === 0 && <Bonus user={props.user} />}
            <PPayouts user={props.user} teams={props.teams} />
            <hr className="p-graph-top" />
            <div className={getPercentReturn() >=0 ? "p-graph-return green" : "p-graph-return red" }>${(getValue() - (user && user.currentMoneyDeposited)).toFixed(2)} [{getPercentReturn()>=0 && '+'}{getPercentReturn()}%] - All</div>
        </div>
    )
}

export default PTotal