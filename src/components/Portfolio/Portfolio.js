import React, {useState, useEffect} from 'react'
import './portfolio.css'
import PTotal from './PTotal'
import PTransfer from './PTransfer'
import PHistory from './PHistory'
import PortfolioChart from './PortfolioChart'
import moment from 'moment'
import {firebaseAnalytics} from '../../services/firebase'


const Portfolio = (props) => {
    //get props
    const user = props.user
    const teams = props.teams
    
    //States
    const [prices, setPrices] = useState([])
    const [labels, setLabels] = useState([])

    //Functions
    
    //get an array of labels for the graph
    //get an array of the prices for the graph
    const getGraphInfo = () => {
        let tenure = user.tenure
        let datesArr = []
        let labelArr = []
        let pricesArr = []
        for(let i = tenure; i>0; i--){
            let d = moment().subtract(i, 'd').format('YYYYMMDD')
            datesArr.push(d)
            labelArr.push(moment().subtract(i, 'd').format('MMM DD'))
            pricesArr.push(user.prices[d] && user.prices[d].toFixed(2))
        }
        setPrices(pricesArr)
        setLabels(labelArr)
    }
    useEffect(() => {
        getGraphInfo()
    }, [props])

    useEffect(()=>{
        firebaseAnalytics.logEvent("portfolio_visit", {
           user: user && user.email 
        })
    },[])

    return(
        <div className='Portfolio'>
            <PTotal user={user} teams={teams} />
            <PortfolioChart prices={prices} labels={labels} />    
            <PTransfer user={user} />
            <PHistory user={user} />
        </div>
    )
}

export default Portfolio