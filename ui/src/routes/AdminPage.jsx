import React from 'react'
import '../scss/_admin.scss'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { toAdmin } from '../store/mainSlicer'
import axios from 'axios';
export default function AdminPage() {
    const [users, setUsers] = useState([{}])
    const [request, setRequest] = useState([{}])
    const token = useSelector((state) => state.main.token)
    const getUsers = async () => {
        console.log('token', token)
        const res = await axios.get('http://79.120.76.23:8888/ban_user', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(res.data)
        return res.data
    }
    const getRequest = async () => {
        console.log('token', token)
        const res = await axios.get('http://79.120.76.23:8888/activate_user ', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
       
        return res.data
    }
    // const request = [{ id: '1', name: 'Mary' },]
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const exitHandler = () => {
        dispatch(toAdmin())
        navigate("/login");
    }

    useEffect(() => {
        setUsers(getUsers())
        setRequest(getRequest())
    }, [])

    return (
        <>
            <div className='admin__header'><h1>Admin</h1>
                <div onClick={exitHandler} className='admin__back' >Go to Entry</div>
            </div>
            <div className='admin'>
                <div className='admin__column'><div className='admin__users'> {users.length && users.map(user =>
                    <Card key={user.id} style={{
                        'display': 'flex'
                    }}>
                        <Card.Title>{user.name}</Card.Title>
                        <button style={{
                            'borderColor': 'rgba(83, 83, 83, 0.0)'
                        }}> banned</button>
                    </Card>)}
                </div></div>
                <div className='admin__column'><div className='admin__request'>{request.length && request.map(user => <Card key={user.id} style={{
                    'display': 'flex'
                }}>
                    <Card.Title>{user.name}</Card.Title>
                    <button style={{
                        'borderColor': 'rgba(83, 83, 83, 0.0)'
                    }}> add</button>
                </Card>)}</div></div>
            </div>
        </>
    )
}