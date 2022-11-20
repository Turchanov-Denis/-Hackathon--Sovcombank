import React from 'react'
import { useState } from 'react';
import Gate from '../components/Login/Gate';
import Registation from '../components/Login/Registation';
import '../scss/_login.scss'

import { useSelector, useDispatch } from 'react-redux'
import { toAuth,setToken } from '../store/mainSlicer'

export default function LoginPage() {
    const authed = useSelector((state) => state.main.authed)
    const token = useSelector((state) => state.main.token)
    const dispatch = useDispatch()
    const [log, setLog] = useState(false)

    const authHandler = () => {
        dispatch(toAuth())
    }
    const tokenHandler = (token) => {
        dispatch(setToken(token))
        dispatch(toAuth())
    }
    return (
        <div className='login'>
            <div className='login__body'>
                {(!log) ? <Gate token={token} setToken={tokenHandler} toAuth={setLog}></Gate> : <Registation setToken={tokenHandler} toAuth={setLog}></Registation>}
            </div>
        </div>
    )
}