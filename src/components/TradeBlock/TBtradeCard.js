import React from 'react'
import './tradeblock.css'

const TBtradeCard = (props) => {
    const t = props.t

    return(
        <div className="TBtradeCard">
            {props.t && <><div className="tb-tc-img-div" ><img className="tb-tc-img"  src={`nba_jersey/${t.share.substring(0, t.share.length - 4)}.png`} alt='team' /></div>
            <div className="tb-tc-name2"><span className="tc-name-sim">Sim</span>{t.share.substring(0, t.share.length - 4)}</div>
            <div className='tb-tc-info'>
                <div className="tb-tc-percent-per"><span className={t.price - t.oldPrice >= 0 ? "color-price green-back" : "color-price red-back"}>${t.price.toFixed(2)} [{(((t.price - t.oldPrice)/t.oldPrice)*100).toFixed(2)}%]</span></div>
                <div className="tb-tc-date2">{`${t.date.substring(4, 6)}/${t.date.substring(6, 8)}/${t.date.substring(0, 4)}`}</div>
            </div></>}
        </div>
    )
}

export default TBtradeCard