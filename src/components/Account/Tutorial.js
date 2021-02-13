import React from 'react'
import './Account.css'
import Header from './Header'

const Tutorial = (props) => {

    const videos = [
        {
            title: 'What is SimBull?',
            link: 'QQApjFZvJME',
            id: 'what-is-simbull'
        },
        {
            title: 'Portfolio',
            link: 'm3LtB1TUQuE',
            id: 'portfolio'
        },
        {
            title: 'My Teams',
            link: 'Lto2j5gH0Tg',
            id: 'myTeams'
        },
        {
            title: 'Trade Block',
            link: '99bgkS3IaXQ',
            id: 'trade-block'
        },
        {
            title: 'Buy and Sell',
            link: 'FHmKmOucVJU',
            id: 'trade-block'
        },
        {
            title: 'Offer to Buy or Sell',
            link: 'vEjQl-js06s',
            id: 'offers'
        },
        {
            title: 'Deposit or Withdraw',
            link: '3toTOZXCRZ8',
            id: 'deposit-withdraw'
        },
    ]

    return(
        <>
            
            <div className="Tutorial DesktopContainer">
                <div className="tutorial-contents">
                    <hr />
                    Tutorial List
                    {videos.map(v => {
                        return(
                            <li className="tutorial-contents-item"><a href={`#${v.id}`} className="blk-txt">{v.title}</a></li>
                        )
                    })}
                </div>
                <hr />
                {videos.map(v => {
                    return(
                        <div className="tutorial-div" id={v.id}>
                            <div className="tutorial-div-title">
                                {v.title}
                            </div>
                            <iframe className='tutorial-video' width="420" height="420" title='infomercial'
                                src={`https://www.youtube.com/embed/${v.link}`}>
                            </iframe>
                        </div>
                    )
                })}
                
            </div>
        </>
    )
}

export default Tutorial