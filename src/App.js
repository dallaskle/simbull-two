import React, {useEffect, useState} from 'react'
//css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//react-router-dom
import {BrowserRouter, Switch, Route, useLocation, withRouter} from 'react-router-dom'
//firebase
import { db, auth } from './services/firebase';
import firebase from 'firebase'
//Components
//LandingPage
import LandingPage from './components/LandingPage/LandingPage'
import OurStory from './components/LandingPage/OurStory'
import ContactUs from './components/LandingPage/ContactUs'
import MakeMoney from './components/LandingPage/MakeMoney'
import FAQs from './components/LandingPage/FAQs'
//Mains
import Holdings from './components/Holdings/Holdings'
import Portfolio from './components/Portfolio/Portfolio'
import Analysis from './components/Analysis/Analysis'
import TradeBlock from './components/TradeBlock/TradeBlock'
import HomeBar from './components/HomeBar/HomeBar'
import TopBar from './components/HomeBar/TopBar'
//Articles
import Article from './components/Analysis/Article'
//Account
import UserAccount from './components/Account/UserAccount'
import EditAccount from './components/Account/EditAccount'
import Transfers from './components/Account/Transfers'
import Withdraw from './components/Account/Withdraw'
import RequestPennant from './components/Account/RequestPennant'
import Subscription from './components/Account/Subscription'
import Referrals from './components/Account/Referrals'
import Notifications from './components/Account/Notifications'
import EditNotifications from './components/Account/EditNotifications'
import GiveReview from './components/Account/GiveReview'
import TermsOfUse from './components/Account/TermsOfUse'
import Privacy from './components/Account/Privacy'
import Tutorial from './components/Account/Tutorial'
//Others
import GettingStarted from './components/GettingStarted/GettingsStarted'
import Login from './components/LogIn/Login'
import Admin from './components/Admin'
import Refer from './components/LandingPage/Referral/Refer'




const App = (props) => {

  //States
  const [authUser, setAuthUser] = useState({loggedIn: false}, {loading: 0})
  const [user, setUser] = useState({})
  const [teams, setTeams] = useState([])
  const [nba, setNba] = useState([])
  const [nfl, setNfl] = useState([])
  const [path, setPath] = useState()


  //Auth Listener
  function onAuthStateChange(callback) {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback({loggedIn: true});
        setAuthUser({loading: 2})
        setAuthUser({loggedIn: true})
      } else {
        callback({loggedIn: false});
        setAuthUser({loading: 1})
      }
    });
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setAuthUser);
    return () => {
      unsubscribe();
    }
  }, []);


  //Getting User and Teams
  const getUser = () => {
    if(authUser.loggedIn){
      db.collection('Users').doc(auth.currentUser.email).onSnapshot(doc => {
        return setUser(doc.data())
      })
    }
  }
  useEffect(() => {
    getUser()
  }, [authUser])

  const getTeams = () => {
    const teams1 = []
    const nflArr = []
    const nbaArr = []
    db.collection('Teams').onSnapshot( snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data()
        teams1.push(data)
        data.league === 'NBA' && nbaArr.push(data)
        data.league === 'NFL' && nflArr.push(data)
      })
      setTeams(teams1)
      setNfl(nflArr)
      setNba(nbaArr)
    })
  }
  useEffect(() => {
    getTeams()
  }, [])

  //Auto Scroll to Top Every Page Switch
  function _ScrollToTop(props) {
    const { pathname } = useLocation();
    setPath(pathname)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return props.children
  }
  const ScrollToTop = withRouter(_ScrollToTop)

  return(
    <div>
      <BrowserRouter>
        <ScrollToTop>
          {authUser.loggedIn && <TopBar />}
          {authUser.loggedIn && <HomeBar path={path} />}
            <Switch>
              {authUser.loading === 0 ? <Route path='/' component={LandingPage} /> : 
                <Switch>
                  {authUser.loading === 1 ? 
                    <Switch>
                      {/* Landing Pages */}
                      <Route exact path='/' component={LandingPage} />
                      <Route path='/ContactUs' component={ContactUs} />
                      <Route path='/Can-I-Make-Money' component={MakeMoney} />
                      <Route path='/FAQs' component={FAQs} />
                      <Route path='/Getting-Started' component={GettingStarted} />
                      <Route path='/Our-Story' component={OurStory} />
                      <Route path='/Login' component={Login} />

                      {/* Affliate Links */}
                      <Route exact path='/:id'render={({history, location, match}) => (<Refer history={history} location={location} match={match} />)} />

                      {/* Catch */}
                      <Route path='/' component={LandingPage} />

                    </Switch> 
                    : teams.length > 0 &&
                      <Switch>
                        {/* Admin */}
                        <Route exact path='/Admin' component={Admin} />

                        {/* Landing Pages */}
                        {/*<Route exact path='/' component={LandingPage} />*/}
                        <Route path='/ContactUs' component={ContactUs} />
                        <Route path='/Can-I-Make-Money' component={MakeMoney} />
                        <Route path='/FAQs' component={FAQs} />
                        <Route path='/Getting-Started' component={GettingStarted} />
                        <Route path='/Our-Story' component={OurStory} />

                        {/* Main 4 Pages */}
                        <Route path='/MyTeams'render={() => (<Holdings user={user} teams={teams} />)} />
                        <Route path='/Portfolio'render={() => (<Portfolio user={user} teams={teams} />)} />
                        <Route path='/TradeBlock'render={() => (<TradeBlock user={user} teams={teams} nfl={nfl} nba={nba} />)} />
                        <Route path='/Analysis'render={() => (<Analysis user={user} />)} />
                        {/* Analysis Articles */}
                        <Route path='/content/:id' component={Article} />

                        {/* Account Pages */}
                        <Route exact path='/Account'render={({history}) => (<UserAccount user={user} history={history} />)} />
                        <Route exact path='/EditAccount'render={({history}) => (<EditAccount user={user} history={history} />)} />
                        <Route exact path='/Transfers'render={({history}) => (<Transfers user={user} history={history} />)} />
                        <Route exact path='/Withdraw'render={({history}) => (<Withdraw user={user} history={history} />)} />
                        <Route exact path='/RequestPennant'render={({history}) => (<RequestPennant user={user} history={history} />)} />
                        <Route exact path='/Subscription'render={({history}) => (<Subscription user={user} history={history} />)} />
                        <Route exact path='/Referrals'render={({history}) => (<Referrals user={user} history={history} />)} />
                        <Route exact path='/Notifications'render={({history}) => (<Notifications user={user} history={history} />)} />
                        <Route exact path='/EditNotifications'render={({history}) => (<EditNotifications user={user} history={history} />)} />
                        <Route exact path='/GiveReview'render={({history}) => (<GiveReview user={user} history={history} />)} />
                        <Route exact path='/Contact-Us'render={({history, location}) => (<ContactUs user={user} history={history} location={location} />)} />
                        <Route exact path='/FAQ' component={FAQs} />
                        <Route exact path='/TermsOfUse' component={TermsOfUse} />
                        <Route exact path='/Privacy' component={Privacy} />
                        <Route exact path='/Tutorials'render={({history}) => (<Tutorial user={user} history={history} />)} />

                        {/* All */}
                        <Route path='/'render={() => (<Portfolio user={user} teams={teams} />)} />

                      </Switch> 
                  }
                </Switch>
              }
            </Switch>
            
        </ScrollToTop>
      </BrowserRouter>
      
    </div>
  )
}

export default App;

