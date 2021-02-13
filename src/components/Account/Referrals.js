import React, {useState, useEffect} from 'react'
import './Account.css'
import Header from './Header'
import {db} from '../../services/firebase'

const Referrals = (props) => {
    //props
    const user = props.user

    //states
    const [newLink, setNewLink] = useState('')
    const [userLink, setUserLink] = useState(user.link ? user.link : false)
    const [show, setShow] = useState(false)
    const [refs, setRefs] = useState([])

    //Functionality
    const createRefLink = () => {
        if(!refs.includes(newLink)){
          let batch = db.batch()
          let extraRef = db.collection('Affiliates').doc(`${newLink}`)
          batch.set(extraRef, {
            link: newLink,
            email: user.email,
            bonusText: '$10 Deposit Bonus on Deposits over $100',
            bonus: 10,
            needed: 100,
            type: 'basic'
          })
          let userRef = db.collection('Users').doc(user.email) 
          batch.update(userRef, {
            link: newLink
          })
          batch.commit().then(res => {
            alert(`You have created a unique referral link for yourself! Go share it everywhere!`);
          }).catch(err => {alert('There was an error. Please try again.')})
          
        }
        else{
          alert('This link is already taken. Please try a different one')
        }
    };

    useEffect(()=> {
        const links1 = []
        db.collection('Affiliates').get().then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                links1.push(data.link)
            })
            setRefs(links1)
        })
    })

    useEffect(() => {
        if(user.link){
            setShow(true)
        }
    })

    const copyLink = () => {
        var textField = document.createElement('textarea')
        textField.innerText = `https://simbull.app/${userLink}`
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        alert('Copied!')
    }


    return(
        <>
        
        <div className="Referrals DesktopContainer">
            <div className='referrals-div'>
                <div className='referrals-head'>Referrals</div>
                <div className='referrals-body'>
                    Create your own referral link to share with your friends, family, and following. Receive $10 when one of your referrals makes their first deposit.
                </div>
                {userLink && (
                    <div>
                    You already have a referral link: <br />
                    <br />
                    <a href={`https://simbull.app/${userLink}`}><span id='link-id'>simbull.app/{userLink}</span></a>
                    <br />
                    <br />
                    <button onClick={copyLink} className="ref-copy-btn">Copy My Link</button>
                    <br />
                    <br />
                    Share this with friends to get $10.
                    </div>
                )}
                {!userLink && (
                    <div>
                        Create your link today. Fill in what you'd like your link to be below.
                        <br />
                        <br />
                        Simbull.app <span className="bar">/</span>{" "}
                        <input
                            onChange={(e) => {
                            setNewLink(e.target.value);
                            }}
                        />
                        <br />
                        <br />
                        <button className="ref-create-btn" onClick={createRefLink}>
                            Create Referral Link
                        </button>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}

export default Referrals