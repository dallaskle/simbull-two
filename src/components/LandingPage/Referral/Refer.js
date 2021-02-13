import React, {useState, useEffect} from 'react'
import {db} from '../../../services/firebase'
import './refer.css'
import logo from '../../assets/Logo-orig.png'
import NavBar from '../NavBar'
import Main from '../Main'
import Signup from '../Signup'
import LongCopy from '../LongCopy'
import HowItWorks from '../HowItWorks'
import Screens from '../Screens'
import Infomercial from '../Infomercial'
import Reviews from '../Reviews'
import SeenOn from '../SeenOn'
import Footer from '../Footer'

const Refer = (props) => {
    const [amt, setAmt] = useState(false)

    useEffect(() => {
        let name = props.match.params.id
        db.collection('Affiliates').doc(name).get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                const data = doc.data()
                let amount = data.bonus
                setAmt(amount)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }, [])

    let code = props.match.params.id

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    return(
        <div className='r-all'>
            <div className=' r-lp'>
                <NavBar />
                </div>
                {amt && <><hr />
            <div className="refer">
                <img className="r-logo" src={logo} /><br /><br />
                <div>Someone thought you might like SimBull!</div>
                <div className="r-sm">Referred by:</div>
                <div className="r-name">{props.match.params.id}</div>
                <div className="r-sm">Referral bonus:</div>
                <div className="r-name">${amt}</div>
                <div className="r-name">Use the Promo Code "{props.match.params.id}" when you deposit!</div>
            </div></>}
            <div className='r-lp'>

                <Main />
                <Signup code={code} />
                <LongCopy />
                <HowItWorks />
                <Screens />
                <Infomercial />
                <Reviews />
                <SeenOn />
                <Signup code={code} />
                
            </div>
            {amt && <div className="r-details">
                <div className="rd-title">Referral Details<br />
                Join Simbull through this page and receive a referral bonus. This
                share is 100% yours, however, before you can cash this out,
                you must maintain an account balance of over $50 for 90 days and have
                over $100 of trading volume.
                </div><hr /><br /><br /><br />
            </div>}
            <Footer />
            </div>
    )
}

export default Refer