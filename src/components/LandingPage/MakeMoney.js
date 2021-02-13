import React from 'react'
import './landingpage.css'
import NavBar from './NavBar'

const MakeMoney = () => {
    return(
        <>
        <NavBar />
        <div className='MakeMoney robo400'>
            <p className="robo900 mm-head" style={{textAlign: 'center'}}>Can I make money in SimBull?</p>
            <p>Yes, there are two ways to make money in the SimBull market and they are similar to how you make money in the stock market.</p>
            <p><span className="robo900">1. Win payouts</span> – Users who own shares are eligible to receive win payouts if a team they own wins a game. SimBull pays $0.50 per share, per win to users who own NFL shares. There are no limits on win payouts so the more shares you own the more you are likely to earn. The win payout amount is different for every sport due to the number of games. NBA win payouts are $0.10 per share, per win because of the 82-game season.</p>
            <p><span className='robo900'>Win Payout Example:</span> John owns 6 shares of the Buffalo Bills and they win a game Sunday afternoon. John will receive $3 in win payouts (6 shares * $.50) and he still has the value of the original shares.</p>
            <p><span className="robo900">2. Share Price Appreciation</span> – Just like in the stock market, if investors think a team is undervalued, they will buy up the shares and the price will increase. The same thing happens in the SimBull market. If you think a team is going to get better and win more in the coming years, you can buy them for cheap and when they rise in value you can sell them for a profit.</p>
            <p><span className='robo900'>Share Price Appreciation Example:</span> The Jaguars are a real-life example. As of 1/8/2020, the Jaguars (1-15) are valued higher than the WFT (7-9), Vikings (7-9), and the Raiders (8-8). Why is that? Users in the market clearly think the first overall pick, another first round pick, and cap space will allow the Jaguars to be a lot more valuable in the next 1-3 years than they are this year. If you think a team is going improve, buy them before they are good and sell them when they increase in value!</p>
            <p className="robo900 md" style={{textAlign: 'center'}}>How do SimBull returns compare to gambling?</p>
            <p>The average gambler betting against the spread operates at a loss of 3-7%. If you bet $11 to win $10, and you only win half of your bets then you will lose around 5% in the long run.</p>
            <p className="robo900">Example 1: The Buffalo Bills</p>
            <p>The Buffalo Bills went 11-5 against the spread this year, which was the most profitable of any team. If you bet $11 on the Bills every game to cover the spread, you would have earned $55 on $176 wagered, which is a 31% return on investment.</p>
            <p>If you deposited $176 (the same amount you gambled) into your SimBull account and bought 9 shares of the Buffalo Bills during the initial share offering, you would have earned $58.5 in win payouts, which is a 33% return on investment. That number does not include share price appreciation which would have earned you a higher return.</p>
            <p className="robo900">Example 2: The Cleveland Browns</p>
            <p>The Cleveland Browns went 6-10 against the spread this year, which was the least profitable of any team. If you bet $11 on the Browns every game to cover the spread, you would have lost $50 on $176 wagered, which is a return of -28.4%.&nbsp;</p>
            <p>If you deposited $176 (the same amount you gambled) into your Simbull account and bought 10 shares of the Cleveland Browns during the initial share offering, you would have earned $55 in win payouts, which is a 30% return on investment. That number does not include share price appreciation which would have earned oyu a higher return.</p>
            <p className="robo900">Example 3: The Average Team</p>
            <p>If you gambled $11 on the average team (8-8 ATS), you would have lost $8 on $176 wagered, a return of -4.5%.</p>
            <p>The average price of an NFL team on SimBull is $22 and the average team receives $4 in win payouts every year, a return of 18%.&nbsp;</p>
            <p>You don't need to put all of your entertainment money in SimBull but diversify your portfolio! It's good to have speculation investments (gambling), it's also good to have safer investments like SimBull that offer steady returns.</p>
         </div>
         </>
    )
}

export default MakeMoney