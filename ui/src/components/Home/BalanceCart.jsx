import React from 'react'


export default function BalanceCart({name,count}) {

    return (
        <div className="balance__body">
            <div className="balance__top">
                <div className="balance__name-currency">{name}</div>
                <div className="balance__extra-currency">
                    <span className="info-balance-cur ibc-small">
                        <span className="curr fa fa-rub"></span>
                        <span className="curr ibc-curr">0.00</span>
                        </span>
                </div>

            </div>
            <div className="balance__middle">
                <div className="balance__cache curr-USD">
                    <span className="curr fa fa-usd"></span>
                    <span className="int">{count}</span>
                    <small><span className="pr">.00</span></small>
                </div>
            </div>
            <div className="balance__bottom">
                <a className="pjax balance__btn-deposit" href="/ru/account/add/?_pjax=Y&amp;curr=USD">Пополнить</a>
                <a className="pjax balance__btn-deposit" href="/ru/account/send/?_pjax=Y&amp;currPS=USD">Вывести</a>
            </div>
        </div>
    )
}