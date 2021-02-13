import React from 'react'
import './portfolio.css'

const PReturn = () => {
    return(
        <div className='PReturn'>
            <hr />
            <div className='p-return-txt2'>Share Return:</div>
            <div className='p-return-amt2'>$12.34</div>
            <hr />
            <div className='p-return-txt2'>Win Payout Return: </div>
            <div className='p-return-amt2'>$12.34</div>
            <hr />
            <div className='p-return-txt'>Total Return:</div>
            <div className='p-return-amt'>$162.43</div>
            <hr />
        </div>
    )
}

export default PReturn