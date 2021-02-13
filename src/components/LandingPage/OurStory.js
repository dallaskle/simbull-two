import React from 'react'
import './landingpage.css'
import NavBar from './NavBar'
import Headshots from './Headshots'
import Footer from './Footer'
  
const OurStory = () => {
    return(
        <>
        <NavBar />
        <div className="OurStory">
            <div className='os-title'>Our Story</div>
            <br />
            <div className='os-body'>
                One winter day, Kenneth, SimBull Co-Founder and CEO, was watching the NFL Draft Combine and absolutely fanboying over Joe Burrow. 
                However, there was no way to bet on the Bengals being good in a few years.
            </div>
            <br />
            <div className='os-body'>
                But, then a thought popped into his head, “What if there was a long term market for sports where you could trade teams like stocks?” 
                From that day on, he has been on a mission to create a way for people to profit and enjoy sports in the long term without the high fees of gambling. 
            </div>
            <br />
            <div className='os-body'>
                Since then, we have been working hard to figure out how to make that dream into a reality. 
            </div>
            <br />
            <div className='os-body'>
                We are a group of friends who are avid sports gamblers, investors, and finance professionals trying to build the best long-term sports market that eliminates the sportsbook’s edge so we can enjoy sports like never before.
            </div>
            <Headshots />
            <hr />
            <div className="os-video-intro">Listen to Kenneth giving you more of the story.</div>
            <iframe className='os-video' width="420" height="420" title='infomercial'
                src="https://www.youtube.com/embed/QQApjFZvJME">
            </iframe>
            <hr />
            <Footer />
        </div>
        </>
    )
}

export default OurStory