import React from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Gate({ toAuth, setToken }) {
    let navigate = useNavigate();
    

    const formHandler = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://79.120.76.23:8888/login', {
            email: e.target[0].value,
            password: e.target[1].value
        })
        console.log(res.data)

        if (res.status != 200) { return alert('Incorect data') }
        
        // set verificate

        
        setToken(res.data.access_token)

        const userByToken = await axios.get('http://79.120.76.23:8888/user/info', {
            headers: {
                'Authorization': 'Bearer ' + res.data.access_token
            }
        })
        // check on admin
        if (userByToken.data.type == 1) {
            navigate("/admin");
        }
        else {
            navigate("/balance");
        }
        


    }
    return (
        <Form onSubmit={e => formHandler(e)}>
            <h1> Entry</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail" >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div style={{
                'display': 'block',
                'color': 'blue',
                'paddingBottom': '10px',
                'cursor': 'pointer'

            }} onClick={() => toAuth(prev => !prev)}> or registation </div>
            <Button variant="primary" type="submit" >
                Submit
            </Button>
        </Form>
    )
}