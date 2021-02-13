import React, {useState, useRef, useEffect} from 'react'
import './Login.css'
import Navbar from '../LandingPage/NavBar'
import Footer from '../LandingPage/Footer'
import {db, auth} from '../../services/firebase'
import firebase from 'firebase'
import moment from 'moment'
import {Link} from 'react-router-dom'

const Login = (props) => {
    //states
    const [login, setLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const emailField = useRef(null)
    const passwordField = useRef(null)

    let code = ''
    if(props.location.state && props.location.state.code){code = props.location.state.code}

    //capture autofill 
    useEffect(() => {
        let interval = setInterval(() => {
          if (emailField.current) {
            setEmail(emailField.current.value)
            setPassword(passwordField.current.value)
            //do the same for all autofilled fields
            clearInterval(interval)
          }
        }, 100)
    })

    //Login
    const handleLogIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage)
        });
        setEmail('');
        setPassword('');
    }

    //Signup
    const handleClick = (e) => {
        e.preventDefault()
        if(password === checkPassword && document.getElementById('check').checked){
            if(email.length > 0 && password.length > 0){
                auth.signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        // Signed in 
                        // ...
                        console.log('user signed in')
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // ..
                        db.collection('Users').doc(email.toLowerCase()).get().then(doc => {
                            if(doc.data()){
                                alert(`Wrong Password`)
                            }
                            else{
                                let date = moment().format('MMMM Do YYYY, h:mm:ss a')
                                let date2 = moment().format('YYYYMMDD-HH:mm:ss')
                                let day = moment()
                                let priceDate = (`0${day.date()}`).slice(-2)
                                let month = (`0${day.month()+1}`).slice(-2)
                                let year = day.year()
                                let useDate = `${year}${month}${priceDate}`
                                let dbFriendly = `prices.${useDate}`
                                let yesterday = moment().subtract(1, 'days').format('YYYYMMDD');
                                let dayBefore = moment().subtract(2, 'days').format('YYYYMMDD');
                                db.collection('Emails').doc(`${date2}-${email}`).set({
                                    email: email,
                                    date: date2
                                }).then(res => {
                                    db.collection('Users').doc(email.toLowerCase()).set({
                                        email: email.toLowerCase(),
                                        cash: 0,
                                        code: code,
                                        date: date,
                                        showPopup: true,
                                        totalValue: 0,
                                        shares: [],
                                        totalPayouts: 0,
                                        nbaPayouts: 0,
                                        nflPayouts: 0,
                                        completedProfile: false,
                                        currentMoneyDeposited: 0,
                                        bonusesReceived: 0,
                                        subscription: false,
                                        referred: 0,
                                        tenure: 2, 
                                        prices: {
                                            [useDate] : 0,
                                            [yesterday] : 0,
                                            [dayBefore] : 0
                                        },
                                        firstName: '',
                                        lastName: '',
                                        phoneNumber: '',
                                        address: '',
                                        zipCode: '',
                                        city: '',
                                        state: '',
                                        referredName: '',
                                        favoriteTeam: '',
                                        birthday: '',
                                    }).then(res2 => {
                                        auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                                            // Handle Errors here.
                                            var errorMessage = error.message;
                                            alert(errorMessage)
                                        });
                                    })
                                })
                            }
                        })
                    })
            }
            else{
                alert('Please fill out all fields.')
                setEmail('')
                setPassword('')
                setCheckPassword('')
            }
        }else{
            alert('Passwords are not the same or the Terms Box is not checked')
            setEmail('')
            setPassword('')
            setCheckPassword('')
        }
    }

    const resetPassword = () => {
        let emailReset = prompt('What is your email address?')
        if(emailReset) {
            auth.sendPasswordResetEmail(emailReset).then(()=>{alert('We sent you an email to reset your password.')})
        }
        else{
            alert('You did not enter an email address. If you lost your password, try again and enter your email. ')
        }
    }


    console.log(email)
    console.log(password)

    return(
        <>
            <Navbar />
            <div className="Login">
                <div className="login-head">Welcome to SimBull - The Stock Market for Sports!</div>
                {login && <form className="login-div" onSubmit={handleLogIn}>
                    <div className="login-div-head">Log In</div>
                    <div>
                        <input className='login-div-input' placeholder='email' value={email} type='email' onChange={(e)=>{setEmail(e.target.value)}} />
                        <input  className='login-div-input' placeholder='password' value={password} type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        <button type="submit" className='login-div-btn'>Go To the Market</button><br />
                        <small><button className="login-forgot" onClick={resetPassword}>Forgot Password?</button></small>
                    </div>
                    <div className='login-switch'>If you dont have an account, <Link onClick={()=>{setLogin(false)}}>click here</Link> to sign up</div>
                </form>}
                {!login && <div className="login-div">
                    <div className="login-div-head">Sign Up</div>
                    <form onSubmit={handleClick}>
                        <input className='login-div-input' placeholder='email' value={email} type='email' onChange={(e)=>{setEmail(e.target.value)}} />
                        <input  className='login-div-input' placeholder='password' value={password} type="password" onChange={(e)=>{setPassword(e.target.value)}} />
                        <input  className='login-div-input' placeholder='confirm password' value={checkPassword} type="password" onChange={(e)=>{setCheckPassword(e.target.value)}} />
                        <br /><input type='checkbox' id="check" className='login-div-check' /> I agree to SimBull's <Link to="/TermsOfUse">Terms</Link>
                        <button type="submit" className='login-div-btn'>Go To the Market</button>
                    </form>
                    <div className='login-switch'>If you have an account, <Link onClick={()=>{setLogin(true)}}>click here</Link> to login</div>
                </div>}
            </div>
            <hr />
            <Footer />
        </>
    )
}

export default Login