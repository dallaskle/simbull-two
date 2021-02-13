import React, {useState, useEffect} from 'react'
import './Analysis.css'
import {db, firebaseAnalytics} from '../../services/firebase'
import ReactHtmlParser from 'react-html-parser'
import Article from './Article'
import {Link} from 'react-router-dom'

const Analysis = (props) => {
    //props
    const user = props.user

    //states
    const [content, setContent] = useState([])
    const [article, setArticle] = useState()

    //Functionality
    const getContent = () => {
        const content1 = []
        db.collection('Analysis').get().then(snapshot => {
            snapshot.forEach(doc => {
                const data = doc.data()
                content1.push(data)
            })
            content1.sort(function(a, b) {
                return b.date - a.date;
            });
            setContent(content1)
        })
    }
    useEffect(() => {
        getContent()
    }, [])
    
    const getArticle = () => {
        db.collection('Analysis').doc('20210127-CardDogs').get().then(doc => {
            const data = doc.data()
            setArticle(data.body)
        })
    }
    useEffect(() => {
        getArticle()
    }, [])


    //Analytics
    useEffect(()=>{
        firebaseAnalytics.logEvent("analysis_visit", {
           user: user && user.email 
        })
    },[])


    return(
        <div className="Analysis DesktopContainer">
            {content.length > 0 && content.map(c => {
                return(
                    <div key={c.title} className="anal-card">
                        {c.url && <Link to={{
                                    pathname: `/content/${c.url}`,
                                    state: {
                                        article: c,
                                        user: user
                                    }
                                }}>
                                    <hr />
                                    <div className="anal-title blk-txt">{c.title}</div>
                                    <div className="anal-sub blk-txt">{c.type} - By: {c.author} - {`${c.date.substring(4, 6)}/${c.date.substring(6, 8)}/${c.date.substring(0, 4)}`}</div>
                                </Link>
                        }
                        {!c.url && <a href={c.link} target="_blank" className="blk-text">
                                    <hr />
                                    <div className="anal-title blk-txt">{c.title}</div>
                                    <div className="anal-sub blk-txt">{c.type} - By: {c.author} - {`${c.date.substring(4, 6)}/${c.date.substring(6, 8)}/${c.date.substring(0, 4)}`}</div>
                                </a>
                        }
                    </div>
                )
            })}
            <hr />
        </div>
    )
}

export default Analysis