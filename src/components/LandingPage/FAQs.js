import React, {useState} from 'react'
import {Accordion, Card, Button} from 'react-bootstrap'
import './landingpage.css'
import NavBar from './NavBar'
import Header from '../Account/Header'
import {Link} from 'react-router-dom'

const FAQs = (props) => {

    const [view, setView] = useState()

    const faqArray = [
        
        {
            Q: [ 'What is SimBull?' ],
            N: 0,
            A: [ "SimBull is a platform to trade sports teams like stock with real cash. If a share you own wins, you also receive a cash win payout. For professional football, win payouts are $0.50. For professional basketball, win payouts are $0.10.", 
                <><br /><br /></>, 
                'The prices of shares are determined by the market, and are normally influenced by how many future wins the market thinks that team will have. This means a bad team might be more expensive than an average team if the bad team is expected to have more wins over the next couple years.', 
                <><br /><br /></>, 
                'The better your team is, the more win payouts you will receive and the more market participants will be willing to pay for your share.'
                ]
        },{
            Q: [ 'What are team shares?' ],
            N: 1,
            A: [ "After funding your account, the next step is to buy virtual shares of professional sports teams. Each virtual share is backed by a team pennant and allows you the opportunity to earn win payouts. We are NOT a gambling website.", 
                <><br /><br /></>, 
                'The physical asset allows our market to operate as an exchange because users are buying and selling a physical asset and not wagering on a specific event. At any given time, you can submit your virtual share to SimBull and we will send you the pennant that is backing your share.', 
                <><br /><br /></>, 
                'Owning virtual shares also gives you the opportunity to receive payouts when a team you own wins. If you choose to submit your share to SimBull for the pennant, you will lose the opportunity of earning future win payouts. Most players will never submit their share for the pennant because of the potential cash payouts for each share.'
                ]
        },
        {
            Q: [ 'What are payouts?' ],
            N: 2,
            A: [ 'Win Payouts are our way of providing value to each share and are the easiest way for you to make money. You have the opportunity to earn win payouts if a team you own wins a game. There is no limit on win payouts so the more virtual shares (i.e. pennants) you own, the more payouts you have the chance of receiving. Payouts for each league have different value due to the number of games in a season.',
                <><br /><br /></>, 
                'Payouts for professional football will be $.50 per share, per team win. ',
                <br />,
                'Payouts for professional basketball will be $.10 per share, per team win.' ]
        },
    
    
    {
        Q: 'Is this gambling?',
        N: 3,
        A: 'No, this is completely legal in all 50 states because SimBull is an exchange. Similar to Ebay or Craigslist, users are buying and selling physical assets in a market. Each asset (i.e. a team pennant) is represented by a virtual share in the market. SimBull holds the asset on your behalf until you choose to submit the virtual share and receive the physical asset. While you have a virtual share, you can earn win payouts. Most users will not take possession of the asset because of the future cash payouts available to users who own virtual shares. The asset also gives users confidence that their investment has value outside the SimBull platform.', 
    },
    {
        Q: 'How do I deposit money?',
        N: 4,
        A: 'Go to the Accounts > Transfers > Add Cash and then select your preferred deposit method. SimBull uses PayPal to accept cash transfers and credit card transactions. ', 
    },
    {
        Q: 'How do I withdraw money?',
        N: 5,
        A: 'Go to Accounts > Transfers > Request Your Money and then enter your withdraw amount. SimBull uses PayPal send money to you so enter the email that is attached to your PayPal account. Once we verify your request in 2-4 business days, we will transfer the money into your PayPal account.', 
    },
    {
        Q: 'How do I request my team pennant?',
        N: 6,
        A: 'Go to Accounts > Transfers > Request your Pennant and then select the share. Once we verify the request, we will mail the pennant and you will receive it in 5-7 business days. ', 
    },
    {
        Q: 'How do I refer friends?',
        N: 7,
        A: 'Go to Portfolio > Share your Referral Link > Copy My Link and send it to all your friends and family! The reward for referring friends changes frequently so be sure to stay up-to-date on the current promotion using this link: https://simbull.app/create-ref-link ', 
    },
    {
        Q: 'Are there trading fees?',
        N: 8,
        A: 'Yes, trading fees fund the payouts. Currently, trading fees are $1 per trade.', 
    },
    {
        Q: 'How do I make money?',
        N: 9,
        A: 'There are two ways to make money on SimBull: Win Payouts and share price appreciation. Users who own virtual shares are eligible for payouts when a team they own wins an event. NFL payouts are $.50 per share, per team win and NBA shares are $.10 per share, per team win. There are no limits on payouts so the more virtual shares you own the more you have the chance to earn. The other way to make money is buy low and sell high. If you believe a team will be good in the future, you can buy the team for cheap and when people value the team higher you can sell your virtual shares to earn a profit.', 
    },
    {
        Q: 'Can I earn payouts after I take possession of my pennant?',
        N: 10,
        A: 'No, once the virtual share is submitted to SimBull, that virtual share is no longer eligible for future payouts. ', 
    },
    {
        Q: 'Do I have to report my earnings to the IRS?',
        N: 11,
        A: 'Please see this article from TurboTax for a detailed description: https://turbotax.intuit.com/tax-tips/self-employment-taxes/a-tax-filing-factsheet-for-ebay-sellers/L7h6uJr0i SimBull is not responsible for your tax liability so please consult a tax professional.', 
    },
    {
        Q: 'Can I create my own shares and sell them on SimBull?',
        N: 12,
        A: 'No, SimBull is a closed market meaning that SimBull will supply all shares sold on the website. We do this to maintain proper supply and demand so the value of virtual shares are not diminished or artificially increased for the first users. SimBull has a formula for when to introduce more shares into the market so shares will not be diminished due to increased supply or demand.', 
    },
    {
        Q: 'How many shares are there for each team in a league?',
        N: 13,
        A: 'SimBull has a metric to determine the number of virtual shares necessary to create the proper supply and demand. The 2020 NFL season will see 20 shares introduced into the market for each team. That number may increase throughout the season as demand increases. We have strict rules on introducing new virtual shares, so we do not diminish the value of the current virtual shares.', 
    },
    {
        Q: 'How are the prices set?',
        N: 14,
        A: 'SimBull will release initial share offering (ISO) shares to our user base in order to launch a new league. The prices of those shares are determined by the company. After the initial launch, SimBull is a free market and all prices are determined by the users in the market. From time to time, SimBull will release more shares into the market as our user base grows. This is done to keep the proper level of supply (shares) in the market as the demand (users) grows.', 
    },
    {
        Q: 'How are the prices of initial offerings of virtual shares created?',
        N: 15,
        A: 'SimBull has a formula that takes into account the present value of future payouts to set the prices for the initial offering. After that, prices are determined by the free market.', 
    },
    {
        Q: 'How are additional shares released into the market?',
        N: 16,
        A: 'SimBull will periodically release new virtual shares into the marketplace when demand for virtual shares increases. The new virtual shares will appear as open ask orders and the prices will be determined by SimBull.', 
    },
    {
        Q: 'Can I trade virtual shares during games?',
        N: 17,
        A: 'Yes, trading is open 24 hours a day, 7 days a week, 365 days a year. Keep in mind, the user who owns the virtual share at the end of a game has the opportunity for the win payout.', 
    },
    {
        Q: 'Is SimBull a Zero-Sum Game?',
        N: 18,
        A: 'A Zero-Sum Game means that the total value of all shares in the market is constant at all time. Meaning, if one team increases in value then another team decreases in value. SimBull is a free market and the value of virtual shares is determined by supply and demand. The value of the market may be higher at certain times and lower at others. SimBull is not a “Zero-Sum Game”, but rather a free market with the possibility of payouts.', 
    },
    ]
    return(
        <>
        {props.location.pathname === "/FAQs" && <NavBar />}
        {props.location.pathname === "/FAQ" && <Header header='' link={props.history.goBack} />}
        <div className='FAQs robo400'>
            <div className="f-head robo900">FAQs</div>
                {faqArray.map(x => {
                    return(
                        <div>
                            <Link onClick={()=>{setView(x.N)}}><div className="faq-head blk-txt">{x.Q}</div></Link>
                            {view === x.N && <div className="faq-body">{x.A}</div>}
                        </div>
                    )
                })}
        </div>
        </>
    )
}

export default FAQs