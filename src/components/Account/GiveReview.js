import React, {useState} from 'react'
import './Account.css'
import Header from './Header'
import {Link} from 'react-router-dom'
import {db} from '../../services/firebase'
import firebase from 'firebase'

const GiveReview = (props) => {
    //props
    const user = props.user

    //states
    const [text, setText] = useState('')

    //Functionality
    const giveReview = () => {
        db.collection('Reviews').doc(`${user.email}-${user.totalValue}`).set({
            user: user.email,
            review: text,
            stars: document.getElementById('review').value,
            date: firebase.firestore.Timestamp.now()
        }).then(res => {
            alert(`Thanks for your review! We appreciate your time.`)
            setText('')
            props.history.goBack()
            return window.location.href="https://simbull.app"
        })
    }


    return(
        <>
        
        <div className="GiveReview DesktopContainer">
            <div className='givereview-div'>
                <div className='givereview-head'>Give a Review</div>
                <div className='givereview-body'>
                    <div className="givereview-left">How many stars do you give SimBull?</div>
                    <br /><br />
                    <div className="givereview-right">
                        <select className="givereview-select" name='review' id='review'>
                            <option value='5'>5</option>
                            <option value='4'>4</option>
                            <option value='3'>3</option>
                            <option value='2'>2</option>
                            <option value='1'>1</option>
                        </select>
                    </div>
                    <div>
                        <br /><br />
                        Could you please explain why? <br />
                        <textarea onChange={(e)=>{setText(e.target.value)}} className="givereview-txt" />
                    </div>
                </div>
            </div>
            <div className='ua-edit-div'><Link onClick={giveReview}>Submit</Link></div>
        </div>
        </>
    )
}

export default GiveReview