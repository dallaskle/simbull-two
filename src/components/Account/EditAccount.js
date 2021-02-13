import React, {useState} from 'react'
import './Account.css'
import {Link} from 'react-router-dom'
import Header from './Header'
import { db } from '../../services/firebase'

const EditAccount = (props) => {
    //props
    const user = props.user

    //states
    const [favoriteTeam, setFavoriteTeam] = useState(user.favoriteTeam)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [phoneNumber, setPhoneNumber] = useState(user.phone)
    const [birthday, setBirthday] = useState(user.birthday)
    const [address, setAddress] = useState(user.address)
    const [zipCode, setZipCode] = useState(user.zipCode)
    const [city, setCity] = useState(user.city)
    const [state, setState] = useState(user.state)

    //Functionality
    const updateUserAccount = () => {
        db.collection('Users').doc(user.email).update({
            favoriteTeam: favoriteTeam ? favoriteTeam : '',
            firstName: firstName ? firstName : '',
            lastName: lastName ? lastName : '',
            phoneNumber: phoneNumber ? phoneNumber : '',
            birthday: birthday ? birthday : '',
            address: address ? address : '',
            zipCode: zipCode ? zipCode : '',
            city: city ? city : '',
            state: state ? state : ''
        }).then(res => {
            props.history.goBack()
            return window.location.href="https://simbull.app/Account"
        })
    }

    return(
        <>
        
        <div className="EditAccount DesktopContainer">
            <div className="ua-div-e">
                <div className="ua-left">Email</div>
                <span className="ua-right">{user.email}</span>
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">Favorite Team</div>
                <input className="ua-right" value={favoriteTeam} onChange={(e)=>{setFavoriteTeam(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">First Name</div>
                <input className="ua-right" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">Last Name</div>
                <input className="ua-right" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">Phone</div>
                <input className="ua-right" value={phoneNumber} onChange={(e)=>{setPhoneNumber(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">Birthday</div>
                <input className="ua-right" value={birthday} onChange={(e)=>{setBirthday(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">Address</div>
                <input className="ua-right" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">Zip Code</div>
                <input className="ua-right" value={zipCode} onChange={(e)=>{setZipCode(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">City</div>
                <input className="ua-right" value={city} onChange={(e)=>{setCity(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className="ua-div-e">
                <div className="ua-left">State</div>
                <input className="ua-right" value={state} onChange={(e)=>{setState(e.target.value)}} />
            </div>
            <hr className="ua-hr" />
            <div className='ua-edit-div'><Link onClick={updateUserAccount}>Save</Link></div>
        </div>
        </>
    )
}

export default EditAccount