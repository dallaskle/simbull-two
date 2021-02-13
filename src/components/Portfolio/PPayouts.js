import React, {useState} from 'react'
import './portfolio.css'
import CollectPayouts from './CollectPayout'

const PPayouts = (props) => {
    const user = props.user
    const teams = props.teams

    const [show, setShow] = useState(false)

    const hide = () => {
        setShow(false)
    }

    return(
        <div className='PPayouts'>
            {user.uncollectedPayouts > 0 && <div className="p-payouts-div">
                <button onClick={()=>{setShow(!show)}} className="p-payouts-btn">Collect Win Payouts ({user.uncollectedPayouts && user.uncollectedPayouts})</button>
            </div>}
            {show && <><CollectPayouts user={user} hide={hide} /></>}
        </div>
    )
}

export default PPayouts