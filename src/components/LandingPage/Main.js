import React from 'react'
import './landingpage.css'
import Phone from '../assets/portfolio-20201008.jpeg'
import Block from '../assets/tradingblock.jpg'
import Trades from '../assets/trades.jpg'
import Carousel from 'react-bootstrap/Carousel'

const Main = () => {
    return(
        <div className='transition'>
            <div className="robo900 main-title"><span className="main-simbull">SimBull -</span>  The Stock Market for Sports
            <div className="robo200 main-under">Over 1,000 Early Adopters <br />More than 2,500 Trades Processed<br />20,000+ Win Payouts Collected</div>
            </div>
            
            <div className='main-car'>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                    className="main-phone-img"
                    src={Phone}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                    className="main-phone-img"
                    src={Block}
                    alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                    className="main-phone-img"
                    src={Trades}
                    alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
            </div>
        </div>
    )
}

export default Main