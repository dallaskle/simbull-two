import React from 'react'
import '../Holdings/Holdings.css'
import Find from '../assets/research.png'
import Money from '../assets/money.png'
import Market from '../assets/equity.png'
import {Link} from 'react-router-dom'
import Logo from '../assets/Logo1.png'
import TopBarDesktop from './TopBarDesktop'

const HomeBar = (props) => {
    return(
        <div className="Bar">
            <div className="desktopOnly"><div className="Bar-div"><img className="Bar-Logo" src={Logo} /><span className="simbull-txt">SimBull</span></div></div>
            <Link to='/MyTeams'><div className={props.path === '/MyTeams' ? "Bar-div bar-selected bar-white" : "Bar-div"}><img src={Find} alt='hom-img' className="Bar-img" /><br /><span className='sm-txt'>My Teams</span></div></Link>
            <Link to='/Portfolio'><div className={props.path === '/' || props.path === '/Portfolio' ? "Bar-div bar-selected bar-white" : "Bar-div"}><img src={Money} alt='hom-img' className="Bar-img" /><br /><span className='sm-txt'>Portfolio</span></div></Link>
            <Link to='/TradeBlock'><div className={props.path === '/TradeBlock' ? "Bar-div bar-selected bar-white" : "Bar-div"}><img src={Market} alt='hom-img' className="Bar-img" /><br /><span className='sm-txt'>Trade Block</span></div></Link>
            <Link to='/Analysis'><div className={props.path === '/Analysis' ? "Bar-div bar-selected bar-white" : "Bar-div"}><img src={Find} alt='hom-img' className="Bar-img" /><br /><span className='sm-txt'>Analysis</span></div></Link>
            <div className="desktopOnly-Account Bar-div blk-txt"><TopBarDesktop /></div>
        </div>
    )
}

export default HomeBar