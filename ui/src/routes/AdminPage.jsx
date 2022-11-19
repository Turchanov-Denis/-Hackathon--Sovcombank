import React from 'react'
import '../scss/_admin.scss'
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { toAdmin } from '../store/mainSlicer'
export default function AdminPage() {

    const users = [{ id: '1', name: 'John' },]
    const request = [{ id: '1', name: 'Mary' },]
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const exitHandler = () => {
        dispatch(toAdmin())
        navigate("/login");
    }
    return (
        <>
            <div style={{
                'display': 'flex',
                'padding': '0 30px',
                'justifyContent': 'space-between',
                'alignItems': 'center'
            }}><h1>Admin</h1>
                <div onClick={exitHandler} style={{
                    'display': 'block',
                    'color': 'blue',
                    'fontSize': '18px',
                    'cursor': 'pointer'
                }} >Go to Entry</div>
            </div>
            <div className='admin'>
                <div className='admin__column'><div className='admin__users'> {users.map(user =>
                    <Card style={{
                        'display': 'flex'
                    }}>
                        <Card.Title>{user.name}</Card.Title>
                        <button style={{
                            'borderColor': 'rgba(83, 83, 83, 0.0)'
                        }}> banned</button>
                    </Card>)}
                </div></div>
                <div className='admin__column'><div className='admin__request'>{request.map(user => <Card style={{
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