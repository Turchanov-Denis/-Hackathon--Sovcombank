import React from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';


export default function Gate({ toAuth }) {
    const formHandler = async (e) => {
        e.preventDefault();
        console.log(e.target[0].value, ' ', e.target[1].value)
        const res = await axios.get('http://79.120.76.23:8888/login', {
            email: e.target[0].value,
            password: e.target[1].value
        })
        console.log(res)


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