import React, {useState} from 'react'
import './landingpage.css'
import NavBar from './NavBar'
import Header from '../Account/Header'
import {db} from '../../services/firebase'
import moment from 'moment'

const ContactUs = (props) => {
    //props
    const user = props.user ? props.user : ''

    //states
    const [name, setName] = useState(user.firstName ? user.firstName : '')
    const [email, setEmail] = useState(user.email ? user.email : '')
    const [message, setMessage] = useState('')

    //Functionality
    const submitContact = () => {
        let today = moment().format('YYYYMMDD')
        db.collection('ContactUs').doc(`${today}-${email}-${name}`).set({
            email: email,
            name: name,
            message: message,
            date: today
        }).then(res => {
            alert('Message Received! We will get back to you as soon as possible. Likely within an hour, but definitely within 24 hours. ')
            setName(user.firstName ? user.firstName : '')
            setEmail(user.email ? user.email : '')
            setMessage('')
            return window.location.href="https://simbull.app"
        })
    }

    return(
        <>
        {props.location.pathname === '/ContactUs' &&  <NavBar />}
        {props.location.pathname === '/Contact-Us' &&  <Header header='' link={props.history.goBack} />}
        <div className="ContactUs">
            <div className="c-Head">Contact Us</div><br />
            <div className='c-txt'>Have a question, comment, or suggestion? We love hearing from you!</div><br />
            <div className="c-name">Name: <br />
                <input className='c-input' value={name} onChange={(e)=>{setName(e.target.value)}} />    
            </div>
            <div className="c-email">Email: <br />
                <input className='c-input' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className="c-message">Message: <br />
                <textarea className='c-input' value={message} onChange={(e)=>{setMessage(e.target.value)}} /><br /><br />
            </div>
            <div className="c-btn-div">
                <button onClick={submitContact} className="c-btn">Contact Us</button>
            </div>
        </div>
        </>
    )
}

export default ContactUs