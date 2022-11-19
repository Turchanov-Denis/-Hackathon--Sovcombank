import React from 'react'

export default function BalanceContent() {


    return (
        <div>
            <h1> Баланс </h1>

            <div class="balance__body">
                <div class="balance__top">
                    <div class="balance__name-currency">USD</div>
                    <div class="balance__extra-currency">
                        <span class="info-balance-cur ibc-small">
                            <span class="curr fa fa-rub"></span>
                            <span class="curr ibc-curr">0.00</span>							</span>
                    </div>

                </div>
                <div class="balance__middle">
                    <div class="balance__cache curr-USD">
                        <span class="curr fa fa-usd"></span>
                        <span class="int">0</span>
                        <small><span class="pr">.00</span></small>
                    </div>
                </div>
                <div class="balance__bottom">
                    <a class="pjax balance__btn-deposit" href="/ru/account/add/?_pjax=Y&amp;curr=USD">Пополнить</a>
                    <a class="pjax balance__btn-deposit" href="/ru/account/send/?_pjax=Y&amp;currPS=USD">Вывести</a>
                </div>
            </div>

        </div>
    )
}