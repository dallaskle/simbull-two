import React from 'react'
import Shooting from '../assets/shootingSports.png'
import cardDog from '../assets/cardDog.jpg'
import lineProphet from '../assets/line-prophet.png'
import airball from '../assets/airball.png'

const SeenOn = () => {
    return(
        <div className='seenon'>
            <img className="logo" src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt='paypal' />
            <img className="logo" src={Shooting} alt='shooting sports ish' />
            <img className="logo" src={cardDog} alt='carddogs' />
            <img className="logo mobile1" src={lineProphet} alt='lineProphet' />
            <img className="logo mobile2" src={airball} alt='airball' />
        </div>

    )
}

export default SeenOn