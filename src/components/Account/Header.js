import React from 'react'
import './Account.css'

const Header = (props) => {
    return(
        <div className="Header DesktopContainer">
            {props.header}
            <button onClick={props.link} className="header-btn">Back</button>
        </div>
    )
}

export default Header