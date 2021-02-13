import React from 'react'
import './landingpage.css'
import dallas from '../assets/dallas-headshot.png'
import kj from '../assets/kj-headshot.png'
import patton from '../assets/patton-headshot.png'

const Headshots = () => {
    return(
        <div className="Headshots">
            <div className="h-div">
                <img src={kj} alt='headshot' className="h-img" />
                <div className="h-name">Kenneth Giles</div>
                <div className='h-details'>Co-Founder and CEO</div>
            </div>
            <div className="h-div">
                <img src={dallas} alt='headshot' className="h-img" />
                <div className="h-name">Dallas Klein</div>
                <div className='h-details'>Co-Founder and CTO</div>
            </div>
            <div className="h-div">
                <img src={patton} alt='headshot' className="h-img" />
                <div className="h-name">Patton Fitzpatrick</div>
                <div className='h-details'>Co-Founder and COO</div>
            </div>
        </div>
    )
}

export default Headshots