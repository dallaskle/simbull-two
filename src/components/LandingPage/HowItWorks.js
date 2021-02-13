import React from 'react'
import './landingpage.css'
import Find from '../assets/research.png'
import Money from '../assets/money.png'
import Market from '../assets/equity.png'

const HowItWorks = () => {
    return(
        <>
        <div className='hiw-mobile'>
            <div className="HowItWorks">
            <div className='hiw-title robo900'>How It Works</div>
            <div className='hiw-section'>
                <span className="hiw-head robo400">Find your Favorite Teams</span>
                <img className='hiw-img' src={Find} alt='Find' /> 
                <span className="hiw-details robo200">Buy your favorite teams, the strong dynasty, or the up-and-coming teams.</span>
            </div>
            <div className='hiw-section'>
                <span className="hiw-head robo400">Earn Win Payouts</span>
                <img className='hiw-img' src={Money} alt='Find' /> 
                <span className="hiw-details robo200">Receive a $0.50/share win payout when NFL teams win and $0.10/share win payout when NBA teams win. Lose nothing when they lose.</span>
            </div>
            <div className='hiw-section'>
                <span className="hiw-head robo400">Trade Teams like Stocks</span>
                <img className='hiw-img' src={Market} alt='Find' /> 
                <span className="hiw-details robo200">Buy Low, Sell High. Sell overrated teams to the market and find hidden gems the market undervalues.</span>
            </div>
        </div>
        </div>
        <div className="hiw-desktop">
            <div className="HowItWorks">
                <div className='hiw-title robo900'>How It Works</div>
                <div className='hiw-section'>
                <span className="hiw-head robo400">Find your Favorite Teams</span>
                </div>
                <div className='hiw-section'>
                <span className="hiw-head robo400">Earn Win Payouts</span>
                </div>
                <div className='hiw-section'>
                <span className="hiw-head robo400">Trade Teams like Stocks</span>
                </div>
                <div className='hiw-section'>
                <img className='hiw-img' src={Find} alt='Find' /> 
                </div>
                <div className='hiw-section'>
                <img className='hiw-img' src={Money} alt='Find' /> 
                </div>
                <div className='hiw-section'>
                <img className='hiw-img' src={Market} alt='Find' /> 
                </div>
                <div className='hiw-section'><span className="hiw-details robo200">Buy your favorite teams, the strong dynasty, or the up-and-coming teams.</span></div>
                <div className='hiw-section'><span className="hiw-details robo200">Receive a $0.50/share win payout when NFL teams win and $0.10/share win payout when NBA teams win. Lose nothing when they lose.</span></div>
                <div className='hiw-section'><span className="hiw-details robo200">Buy Low, Sell High. Sell overrated teams to the market and find hidden gems the market undervalues.</span></div>
            </div>
        </div>
        </>
    )
}

export default HowItWorks