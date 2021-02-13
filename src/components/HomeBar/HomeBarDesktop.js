import React from 'react'
import '../Holdings/Holdings.css'
import {Link} from 'react-router-dom'
import Logo from '../assets/Logo1.png'
import TopBarDesktop from './TopBarDesktop'

const HomeBar = () => {
    return(
        <div className="Bar-desktop">
            <div className="Bar-div-desktop center"><img className="Bar-Logo-desktop" src={Logo} /></div>
            <Link to='/MyTeams'><div className="Bar-div-desktop"><br /><span className='sm-txt-desktop'>My Teams</span></div></Link>
            <Link to='/Portfolio'><div className="Bar-div-desktop"><br /><span className='sm-txt-desktop'>Portfolio</span></div></Link>
            <Link to='/TradeBlock'><div className="Bar-div-desktop"><br /><span className='sm-txt-desktop'>Trade Block</span></div></Link>
            <Link to='/Analysis'><div className="Bar-div-desktop"><br /><span className='sm-txt-desktop'>Analysis</span></div></Link>
            <div className="Bar-div-desktop blk-txt"><TopBarDesktop /></div>
        </div>
    )
}

export default HomeBar