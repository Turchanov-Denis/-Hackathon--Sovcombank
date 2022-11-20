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
        const res = await axios.get('http://79.120.76.23:8888/verified_users', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        setUsers(res.data)
    }
    const getRequest = async () => {
        console.log('token', token)
        const res = await axios.get('http://79.120.76.23:8888/inactive_users ', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        setRequest(res.data)
    }
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const exitHandler = () => {
        dispatch(toAdmin())
        navigate("/login");
    }

    const addUsersByrequest = async ({ email, state }) => {
        await axios.post('http://79.120.76.23:8888/activate', { email, state: !state }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        getRequest()
        getUsers()
    }

    const assingBan = async ({ email, is_blocked }) => {
        await axios.post('http://79.120.76.23:8888/ban', { email, state: !is_blocked }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        getUsers()
    }

    useEffect(() => {
        getUsers()
        getRequest()

    }, [])


    return (
        <>
            <div className='admin__header'><h1>Admin</h1>
                <div onClick={exitHandler} className='admin__back' >Go to Entry</div>
            </div>
            <div className='admin'>
                <div className='admin__column'><div className='admin__users'> {users.length > 0 && users.map((user, index) =>

                    <Card key={index} style={{
                        'display': 'flex'
                    }}>
                        <Card.Title>{user.email}</Card.Title>
                        {user.is_blocked ? <button onClick={() => { assingBan(user) }} style={{
                            'borderColor': 'rgba(83, 83, 83, 0.0)'
                        }}>recive</button> : <button onClick={() => { assingBan(user) }} style={{
                            'borderColor': 'rgba(83, 83, 83, 0.0)'
                        }}>assign ban</button>}
                    </Card>)}
                </div></div>
                <div className='admin__column'><div className='admin__request'>{request.length > 0 && request.map((user, index) => <Card key={index} style={{
                    'display': 'flex'
                }}>
                    <Card.Title>{user.email}</Card.Title>
                    <button onClick={() => addUsersByrequest(user)} style={{
                        'borderColor': 'rgba(83, 83, 83, 0.0)'
                    }}> add</button>
                </Card>)}</div></div>
            </div>
        </>
    )
}