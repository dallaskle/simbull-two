import React from 'react'
import './landingpage.css'
import Carousel from 'react-bootstrap/Carousel'
import Phone from '../assets/portfolio-20201008.jpeg'

const Screens = () => {
    return(
        <div className='Screens'>
            <div className='screens-title robo900'>Trade 24/7 <br />365 days a year</div>
            <Carousel>
                <Carousel.Item interval={1500}>
                    <img
                    className="screens-img"
                    src={Phone}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <p className="caption robo400">Keep track of your shares and win payouts on the portfolio page.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                    className="screens-img"
                    src={Phone}
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <p className="caption robo400">Research team shares and execute trades on the Trading Block.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                    className="screens-img"
                    src={Phone}
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <p className="caption robo400">View the latest trades and newest offers on the Trade Feed so you never miss a deal.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default Screens