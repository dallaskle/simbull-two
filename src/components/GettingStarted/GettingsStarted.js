import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './gettingstarted.css'
import trades from './assets/trades.jpg'
import portfolio from './assets/portfolio-20201008.jpeg'
import tradingBlock from './assets/tradingblock.jpg'
import NavBar from '../LandingPage/NavBar'

const GettingStarted = () => {
    return(
        <>
        <NavBar />
        <div className="GettingStarted DesktopContainer">
            <div className="gs-head">How do I get started?</div>
            <br /><div className="gs-sub">SimBull is a stock market for sports that allows you to buy and sell sports teams like stocks, earn win payout, and profit off your favorite team's success. 
            <br /><br />We have created a long term market so you can enjoy sports and keep your money from going into the sportsbooks pockets.</div>
            <Carousel indicators={false}>
                <Carousel.Item interval={5000}>
                    <img
                        className="gs-img"
                        src={tradingBlock}
                        alt="tradingBlock"
                        />
                        <div className="gs-car-txt"><br /><div className="gs-sub">First, check out the Trading Block and find a team to buy. </div>
                        <br /><div className='gs-sub'>But which team should you buy? </div>
                        <br /><div className="gs-sub">A lot of people buy their favorite team to start, while our most savy users are looking for the shares that are cheapest relative to how many wins they'll get in the future.</div>
                        </div>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                    <img
                        className="gs-img"
                        src={portfolio}
                        alt="portfolio"
                        />
                        <div className="gs-car-txt"><br /><div className='gs-sub'>Next, after you buy a share, you can start collecting win payouts that day. You get a win payout each time your teams win, and lose nothing when they lose.</div>
                        <br /><div className='gs-sub'>All your teams, offers, account value, and win payouts are located in the portfolio.</div></div>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                <img
                    className="gs-img"
                    src={trades}
                    alt="team"
                    />
                    <div className="gs-car-txt"><br /><div className='gs-sub'>Finally, curious about what other people are thinking about your share? Go to the trade feed to watch new trades and offers in real-time.</div>
            <br /><div className='gs-sub'>It's really that simple. Buy a share, collect your win payouts, and enjoy having some skin in the game.</div></div>
            
                </Carousel.Item>
                
                
            </Carousel>
        </div>
        </>
    )
}

export default GettingStarted