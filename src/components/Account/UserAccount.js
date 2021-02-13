import React from 'react'
import './Account.css'
import {Link} from 'react-router-dom'
import Header from './Header'

const UserAccount = (props) => {
    const user = props.user
    console.log(props)
    return(
        <>
        
        <div className="UserAccount DesktopContainer">
            <div className="ua-div">
                <div className="ua-left">Email</div>
                <div className="ua-right">{user && user.email}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">Favorite Team</div>
                <div className="ua-right">{user.favoriteTeam ? user.favoriteTeam : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">First Name</div>
                <div className="ua-right">{user.firstName ? user.firstName : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">Last Name</div>
                <div className="ua-right">{user.lastName ? user.lastName : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">Phone</div>
                <div className="ua-right">{user.phoneNumber ? user.phoneNumber : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">Birthday</div>
                <div className="ua-right">{user.birthday ? user.birthday : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">Address</div>
                <div className="ua-right">{user.address ? user.address : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">Zip Code</div>
                <div className="ua-right">{user.zipCode ? user.zipCode : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">City</div>
                <div className="ua-right">{user.city ? user.city : '---'}</div>
            </div>
            <div className="ua-div">
                <div className="ua-left">State</div>
                <div className="ua-right">{user.state ? user.state : '---'}</div>
            </div>
            <div className='ua-edit-div'><Link to='/EditAccount'>Edit</Link></div>
        </div>
        </>
    )
}

export default UserAccount