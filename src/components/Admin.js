import React from 'react'
import {db} from '../services/firebase'
import firebase from 'firebase'

const Admin = () => {

    const teams = [
       {
            Conference: "East",
            Team: "76ers",
            asksAvailable: 7,
            bidsAvailable: 4,
            city: "Philadelphia",
            conference: "East",
            division: "Atlantic",
            highestBidPrice: 27.55,
            lastSoldPrice: 32.5,
            league: "NBA",
            losses: 4,
            lowestAskPrice: 33,
            prices: {20201206: 30.69, 20201207: 30.69, 20201208: 30.69, 20201209: 30.69, 20201210: 30.9969, 20201211: 30.69, 20201212: 30.383100000000002, 20201213: 30.69, 20201214: 30.69, 20201215: 30.69, 20201216: 30.69, 20201217: 30.69, 20201218: 30.69, 20201219: 30.69, 20201220: 30.69, 20201221: 30.54, 20201222: 30.69, 20201223: 30.69, 20201224: 30, 20201225: 30, 20201226: 30.69, 20201227: 30.75, 20201228: 30.75, 20201229: 30, 20201230: 30.75, 20201231: 31, 20210101: 30.75, 20210102: 32, 20210103: 31.25, 20210104: 32.5, 20210105: 33.5, 20210106: 33.5, 20210107: 32.5, 20210108: 32.75, 20210109: 33, 20210110: 33.2, 20210111: 32.7, 20210112: 32.5},
            sharesOutstanding: 30,
            team: "76ers",
            tenure: 29,
            totalAskPrice: 236.5,
            totalBidPrice: 109.05,
            wins: 8,
            yearHigh: 33.5,
            yearLow: 30,
       },
       {
            Conference: "West",
            Team: "Blazers",
            asksAvailable: 8,
            bidsAvailable: 2,
            city: "Portland",
            conference: "West",
            division: "Northwest",
            highestBidPrice: 26.05,
            lastSoldPrice: 26.25,
            league: "NBA",
            losses: 4,
            lowestAskPrice: 26.5,
            prices: {20201206: 27.93, 20201207: 27.93, 20201208: 27.93, 20201209: 27.93, 20201210: 28.2093, 20201211: 27.93, 20201212: 27.6507, 20201213: 27.93, 20201214: 27.93, 20201215: 27.93, 20201216: 27.93, 20201217: 27.93, 20201218: 27.93, 20201219: 27.93, 20201220: 27.93, 20201221: 27.93, 20201222: 27.93, 20201223: 27.93, 20201224: 27.93, 20201225: 27.93, 20201226: 27.93, 20201227: 28, 20201228: 28, 20201229: 27.93, 20201230: 28, 20201231: 28, 20210101: 28, 20210102: 28, 20210103: 28.2, 20210104: 28.2, 20210105: 28.2, 20210106: 27, 20210107: 27, 20210108: 27, 20210109: 27, 20210110: 27, 20210111: 27, 20210112: 26},
            sharesOutstanding: 30,
            team: "Blazers",
            tenure: 29,
            totalAskPrice: 220,
            totalBidPrice: 52.05,
            wins: 5,
            yearHigh: 28.2,
            yearLow: 26,
       },
       {
            Conference: "East",
            Team: "Bucks",
            asksAvailable: 6,
            bidsAvailable: 4,
            city: "Milwaukee",
            conference: "East",
            division: "Central",
            highestBidPrice: 30.05,
            lastSoldPrice: 31.5,
            league: "NBA",
            losses: 4,
            lowestAskPrice: 31,
            prices: {20201206: 34.82, 20201207: 34.82, 20201208: 34.82, 20201209: 34.82, 20201210: 35.1682, 20201211: 34.82, 20201212: 34.4718, 20201213: 34.82, 20201214: 34.82, 20201215: 34.82, 20201216: 34.82, 20201217: 34.82, 20201218: 34.82, 20201219: 34.82, 20201220: 34.82, 20201221: 34.82, 20201222: 34.82, 20201223: 34.82, 20201224: 35, 20201225: 35, 20201226: 34.82, 20201227: 33, 20201228: 33, 20201229: 35, 20201230: 33, 20201231: 33, 20210101: 33, 20210102: 33, 20210103: 32, 20210104: 32, 20210105: 32, 20210106: 30.5, 20210107: 30.5, 20210108: 30.5, 20210109: 30.5, 20210110: 30.5, 20210111: 30.5, 20210112: 31},
            sharesOutstanding: 30,
            team: "Bucks",
            tenure: 29,
            totalAskPrice: 210.8,
            totalBidPrice: 116.92999999999999,
            wins: 8,
            yearHigh: 35,
            yearLow: 30.25
       },
       {
            Conference: "East",
            Team: "Bulls",
            asksAvailable: 8,
            bidsAvailable: 2,
            city: "Chicago",
            conference: "East",
            division: "Central",
            highestBidPrice: 16.75,
            lastSoldPrice: 17.25,
            league: "NBA",
            losses: 7,
            lowestAskPrice: 20.34,
            prices: {20201206: 20.34, 20201207: 20.34, 20201208: 20.34, 20201209: 20.34, 20201210: 20.5434, 20201211: 20.34, 20201212: 20.1366, 20201213: 20.34, 20201214: 20.34, 20201215: 20.34, 20201216: 20.34, 20201217: 20.34, 20201218: 20.34, 20201219: 20.34, 20201220: 20.34, 20201221: 20.34, 20201222: 20.34, 20201223: 20.34, 20201224: 20.34, 20201225: 20.34, 20201226: 20.34, 20201227: 16.72, 20201228: 16.72, 20201229: 20.34, 20201230: 16.72, 20201231: 16.72, 20210101: 16.72, 20210102: 16.72, 20210103: 16.72, 20210104: 16.72, 20210105: 17, 20210106: 17, 20210107: 17, 20210108: 17, 20210109: 17, 20210110: 17, 20210111: 17, 20210112: 17.2},
            sharesOutstanding: 30,
            team: "Bulls",
            tenure: 29,
            totalAskPrice: 154.2,
            totalBidPrice: 33.47,
            wins: 4,
            yearHigh: 20.34,
            yearLow: 16.72,
       },
       {
            Conference: "East",
            Team: "Cavaliers",
            asksAvailable: 2,
            bidsAvailable: 4,
            city: "Cleveland",
            conference: "East",
            division: "Central",
            highestBidPrice: 13.55,
            lastSoldPrice: 18.99,
            league: "NBA",
            losses: 7,
            lowestAskPrice: 18.99,
            prices: {20201206: 15.52, 20201207: 15.52, 20201208: 15.52, 20201209: 15.52, 20201210: 15.6752, 20201211: 15.52, 20201212: 15.364799999999999, 20201213: 15.52, 20201214: 15.52, 20201215: 15.52, 20201216: 15.52, 20201217: 15.52, 20201218: 15.52, 20201219: 15.52, 20201220: 15.52, 20201221: 15.52, 20201222: 15.52, 20201223: 15.52, 20201224: 15.52, 20201225: 15.52, 20201226: 15.52, 20201227: 16.75, 20201228: 16.75, 20201229: 15.52, 20201230: 16.75, 20201231: 16.75, 20210101: 16.75, 20210102: 16.75, 20210103: 17, 20210104: 17, 20210105: 17, 20210106: 16.85, 20210107: 17, 20210108: 16.85, 20210109: 16.85, 20210110: 16.85, 20210111: 16.85, 20210112: 16.85},
            sharesOutstanding: 30,
            team: "Cavaliers",
            tenure: 29,
            totalAskPrice: 37.989999999999995,
            totalBidPrice: 54.05,
            wins: 5,
            yearHigh: 18.99,
            yearLow: 15.52
       },
       {
            Conference: "East",
            Team: "Celtics",
            asksAvailable: 2,
            bidsAvailable: 2,
            city: "Boston",
            conference: "East",
            division: "Atlantic",
            highestBidPrice: 27.5,
            lastSoldPrice: 32,
            league: "NBA",
            losses: 3,
            lowestAskPrice: 32,
            prices: {20201206: 32.07, 20201207: 32.07, 20201208: 31.98, 20201209: 31.95, 20201210: 32.3907, 20201211: 32.07, 20201212: 31.7493, 20201213: 32.07, 20201214: 32.07, 20201215: 32.07, 20201216: 32.07, 20201217: 32.07, 20201218: 32.07, 20201219: 32.07, 20201220: 32.07, 20201221: 32.07, 20201222: 32.07, 20201223: 32.07, 20201224: 32.07, 20201225: 32.07, 20201226: 32.07, 20201227: 31, 20201228: 31, 20201229: 32.07, 20201230: 31, 20201231: 31.5, 20210101: 31.25, 20210102: 30.2, 20210103: 29.85, 20210104: 30, 20210105: 30, 20210106: 31.5, 20210107: 30.55, 20210108: 31.85, 20210109: 31.5, 20210110: 31.5, 20210111: 31.5, 20210112: 32},
            sharesOutstanding: 30,
            team: "Celtics",
            tenure: 29,
            totalAskPrice: 65,
            totalBidPrice: 54.95,
            wins: 7,
            yearHigh: 32.07,
            yearLow: 29.85,
       },
       {
            Conference: "West",
            Team: "Clippers",
            asksAvailable: 6,
            bidsAvailable: 4,
            city: "Los Angeles",
            conference: "West",
            division: "Pacific",
            highestBidPrice: 28.05,
            lastSoldPrice: 32.1,
            league: "NBA",
            losses: 4,
            lowestAskPrice: 32,
            prices: {20201206: 32.07, 20201207: 32.07, 20201208: 32.07, 20201209: 32.07, 20201210: 32.3907, 20201211: 32.07, 20201212: 31.7493, 20201213: 32.07, 20201214: 32.07, 20201215: 32.07, 20201216: 32.07, 20201217: 32.07, 20201218: 32.07, 20201219: 32.07, 20201220: 32.07, 20201221: 32.07, 20201222: 32.07, 20201223: 32.07, 20201224: 32.07, 20201225: 32.07, 20201226: 32.07, 20201227: 33, 20201228: 33, 20201229: 32.07, 20201230: 33, 20201231: 33, 20210101: 33, 20210102: 33, 20210103: 33.5, 20210104: 33.5, 20210105: 33.5, 20210106: 33.25, 20210107: 33.25, 20210108: 33.25, 20210109: 33.25, 20210110: 33.25, 20210111: 33.25, 20210112: 32},
            sharesOutstanding: 30,
            team: "Clippers",
            tenure: 29,
            totalAskPrice: -1150.2,
            totalBidPrice: 112.05,
            wins: 8,
            yearHigh: 33.5,
            yearLow: 32,
       }
    ]

    const users = [
        {
            email: 'dallasjklein@gmail.com',
            cash: 100,
            code: '',
            date: '20210114',
            showPopup: true,
            totalValue: 1453,
            shares: [],
            totalPayouts: 20,
            nbaPayouts: 12,
            nflPayouts: 8,
            completedProfile: false,
            currentMoneyDeposited: 1000,
            bonusesReceived: 100,
            subscription: true,
            referred: 10,
            tenure: 2, 
            prices: {
                20210114 : 0,
                20210115 : 0,
                20210116 : 0
            },
            firstName: 'Dallas',
            lastName: '',
            phoneNumber: '',
            address: '',
            zipCode: '',
            city: '',
            state: '',
            referredName: '',
            favoriteTeam: '',
            birthday: '',
        },
        {
            email: 'dallas@klein.com',
            cash: 200,
            code: '',
            date: '20210114',
            showPopup: true,
            totalValue: 2854,
            shares: [],
            totalPayouts: 40,
            nbaPayouts: 24,
            nflPayouts: 16,
            completedProfile: false,
            currentMoneyDeposited: 2000,
            bonusesReceived: 100,
            subscription: true,
            referred: 20,
            tenure: 2, 
            prices: {
                20210114 : 0,
                20210115 : 0,
                20210116 : 0
            },
            firstName: 'K',
            lastName: '',
            phoneNumber: '',
            address: '',
            zipCode: '',
            city: '',
            state: '',
            referredName: '',
            favoriteTeam: '',
            birthday: '',
        },
       
    ]

    const loadTeams = () => {
        teams.map(t => {
            db.collection("Teams").doc(t.team).set(t)
        })
    }

    const getTeams = () => {
        db.collection('Teams').get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.data())
            })
        })
    }

    const loadShares = () => {
        teams.map(t => {
            for(let i = 1; i < 6; i++){
                db.collection('Shares').doc(`${t.team}000${i}`).set({
                    city: t.city,
                    currentAsk: null,
                    lastSoldPrice: t.lastSoldPrice,
                    onTradingBlock: false,
                    owner: 'dallasjklein@gmail.com',
                    shareID: `${t.team}000${i}`,
                    team: t.team,
                    teamNum: `000${i}`,
                    totalPayouts: 0
                })
            }
        })
    }

    const loadUsers = () => {
        users.map(u => {
            db.collection('Users').doc(`${u.email}`).set(u)
        })
    }

    const loadUsersShares = () => {
        teams.map(t => {
            for(let i = 3; i < 6; i++){
                db.collection('Users').doc('dallas@klein.com').update({
                    shares: firebase.firestore.FieldValue.arrayUnion(`${t.team}000${i}`)
                })
            }
        })
    }


    return(
        <div>
            Admin
            <br /><br /><br />
            <div><button onClick={getTeams}>get teams</button></div>
            <div><button onClick={loadTeams}>loadTeams</button></div>
            <div><button onClick={loadShares}>loadShares</button></div>
            <div><button onClick={loadUsers}>loadUsers</button></div>
        </div>
    )
}

export default Admin 