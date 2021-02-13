import React, {useEffect} from 'react'
import NavBar from './NavBar'
import Main from './Main'
import Signup from './Signup'
import LongCopy from './LongCopy'
import HowItWorks from './HowItWorks'
import Screens from './Screens'
import Infomercial from './Infomercial'
import Reviews from './Reviews'
import SeenOn from './SeenOn'
import Footer from './Footer'
import './landingpage.css'
import {firebaseAnalytics} from '../../services/firebase'

const LandingPage = () => {

    useEffect(()=>{
        firebaseAnalytics.logEvent("landingPage_visit")
    },[])

    return(
        <div>
            <NavBar />
            <Main />
            <Signup />
            <LongCopy />
            <HowItWorks />
            <Screens />
            <Infomercial />
            <Reviews />
            <SeenOn />
            <Signup />
            <Footer />
        </div>
    )
}

export default LandingPage