import React from 'react'
import { useState, useEffect } from 'react'
import BalanceCart from './BalanceCart'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
export default function BalanceContent() {

    const token = useSelector((state) => state.main.token)
    const moneyList = ['USD',
        'RUB',
        'EUR',
        'BTC',
        ]
    const [userInfo, setUserInfo] = useState([{}]);
    const getUserInfo = async () => {
        const res = await axios.get('http://79.120.76.23:8888/user/info', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(res.data)
        setUserInfo(res.data)
    }

    useEffect(() => { getUserInfo() }, [])

    return (
        <div className='balance'>
            <h1> Баланс </h1>

            <div className='balance__content'>
                {moneyList.map(info => <BalanceCart name={info} count={userInfo[info]} ></BalanceCart>)}
            </div>
        </div>
    )
}