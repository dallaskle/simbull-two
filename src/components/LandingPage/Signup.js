import React, {useState, useEffect, useRef} from 'react'
import './landingpage.css'
import {db, auth} from '../../services/firebase'
import moment from 'moment'
 
const Signup = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailField = useRef(null)
    const passwordField = useRef(null)

    let code = ''
    if(props.location && props.location.state && props.location.state.code){code = props.location.state.code}else{
        if(props.code){code = props.code}
    }
    

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
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
            alert('Please fill out both fields.')
            setEmail('')
            setPassword('')
        }
    }

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

    return(
        <div className="signup transition">
            <hr className='signup-hr' />
            <div className="signup-title robo900">Create a Free Account and <br />Join the Market in Seconds</div>
            <form onSubmit={handleClick}>
                <input onChange={handleEmail} className='signup-input robo200' placeholder='email' type='email' value={email} />
                <input onChange={handlePassword}  className='signup-input robo200' placeholder='password' type='password' value={password} />
                <br />
                <span className='signup-terms robo200'>By creating an account, you agree to SimBull's<a href='/Terms-Of-Use'> Terms</a></span>
                <button type="submit" className='signup-btn robo400'>Go To the Market</button>
            </form> 
            <hr className='signup-hr' />
        </div>
    )
}

export default Signup