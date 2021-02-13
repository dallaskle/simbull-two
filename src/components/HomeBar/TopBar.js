import React, {useState} from 'react'
import logo from '../assets/Logo1.png'
import userPic from '../assets/user.png'
import './TopBar.css'
import {Link} from 'react-router-dom'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Account from '../Account/Account'
import close from '../assets/close.png'


const TopBar = () => {
    const [state, setState] = useState({
        isPaneOpenLeft: false
      });

    const closeBar = () => {
        setState({ isPaneOpenLeft: false })
    }

    function _ScrollToTop() {
        return window.scrollTo(0, 0);
      }

    return(
        <div className='TopBar'>
            <div className="tb-user-icon">
                <Link onClick={() => setState({ isPaneOpenLeft: true })} to="#"><img src={userPic} className="tb-logo" alt='logo' /></Link>
            </div>
            <div className="tb-logo-div">
                <Link onClick={_ScrollToTop} to="#"><img src={logo} className="tb-logo2" alt='logo' /></Link>
            </div>
            <SlidingPane
                closeIcon={<Close />}
                isOpen={state.isPaneOpenLeft}
                from="left"
                onRequestClose={() => setState({ isPaneOpenLeft: false })}
            >
                <Account closeBar={closeBar} />
            </SlidingPane>
        </div>
    )
}

export default TopBar

const Close = () => {
    return(
        <div className='close-div'>
            <img src={close} className='close' alt='close' />
        </div>
    )
}