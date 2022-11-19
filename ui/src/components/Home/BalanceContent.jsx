import React from 'react'
import BalanceCart from './BalanceCart'

export default function BalanceContent() {
    return (
        <div className='balance'>
            <h1> Баланс </h1>

            <div className='balance__content'>
                <BalanceCart></BalanceCart>
                <BalanceCart></BalanceCart>
                <BalanceCart></BalanceCart>
                <BalanceCart></BalanceCart>
            </div>
        </div>
    )
}