import React from 'react'
import './landingpage.css'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Phone from '../assets/portfolio-20201008.jpeg'
import Block from '../assets/tradingblock.jpg'
import Analysis from '../assets/analysis.jpg'
import Trades from '../assets/trades.jpg'

const Screens = (props) => {
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return(
        <div className='Screens'>
            <div className='screens-title robo900'>Trade 24/7 <br />365 days a year</div>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={responsive}
                dotListClass="custom-dot-list-style"
                className="caro"
            >
                <div className='caro-item'>
                    <img
                    className="screens-img"
                    src={Phone}
                    alt="First slide"
                    />
                    <p className="caption robo400">Keep track of your shares and win payouts on the portfolio page.</p>
                </div>
                <div>
                    <img
                    className="screens-img"
                    src={Block}
                    alt="First slide"
                    />
                    <p className="caption robo400">Research team shares and execute trades on the Trading Block.</p>
                </div>
                <div>
                    <img
                    className="screens-img"
                    src={Trades}
                    alt="First slide"
                    />
                    <p className="caption robo400">View the latest trades and newest offers on the Trade Feed so you never miss a deal.</p>
                </div>
                <div>
                    <img
                    className="screens-img"
                    src={Analysis}
                    alt="First slide"
                    />
                    <p className="caption robo400">Get up to date SimBull news and analysis.</p>
                </div>
            </Carousel>
        </div>
    )
}

export default Screens