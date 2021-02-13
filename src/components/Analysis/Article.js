import React, {useEffect} from 'react'
import './Analysis.css'
import ReactHtmlParser from 'react-html-parser'
import {firebaseAnalytics} from '../../services/firebase'

const Article = (props) => {

    //props
    const article = props.location.state.article

    //Analytics
    useEffect(()=>{
        firebaseAnalytics.logEvent("article_visit", {
           user: props.user && props.user.email,
           article: article.title
        })
    },[])

    return(
        <div className="Article DesktopContainer">
            {article.title && <>
                <div className="anal-title-2 blk-txt">{article.title}</div>
                <div className="anal-sub blk-txt">{article.type} - By: {article.author} - {`${article.date.substring(4, 6)}/${article.date.substring(6, 8)}/${article.date.substring(0, 4)}`}</div>
                <br />
                <div>{ReactHtmlParser(article.body)}</div>
            </>}
        </div>
    )
}

export default Article