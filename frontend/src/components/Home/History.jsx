import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
export default function History() {
    const [history,setHistory] = useState([])
    const token = useSelector((state) => state.main.token)
    const getHistory = async ()=> {
        const res = await axios.get('http://79.120.76.23:8888/history', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(res.data)
        setHistory(res.data)
    }

    useEffect(()=>{
        getHistory()
    },[])
    return (
        <div>
            <h1>История</h1>
            {history.length>0 && history.map(item => <div> {`Валюта: ${item['History']['type1']} изменено: ${item['History']['value1']}`}</div>)}
        </div>
    )
}