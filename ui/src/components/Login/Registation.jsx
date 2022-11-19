import React from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
export default function Registation({toAuth}) {
    const formHandler = async (e) => {
        e.preventDefault();
        console.log(e.target[0].value, ' ', e.target[1].value)
        const res = await axios.post('http://79.120.76.23:8888/reg', {
            email: e.target[0].value,
            password: e.target[1].value
        })
        console.log(res)


    }
    return (
        <Form onSubmit={e => formHandler(e)}>
            <h1> Registation </h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                'display': "flex",
                'justifyContent': "space-between"
            }}><Button variant="primary" type="submit">
                    Submit
                </Button>
                <div style={{
                    'display': 'inline-block',
                    'color': 'blue',
                    'paddingTop': '10px',
                    'cursor': 'pointer',

                }} onClick={() => toAuth(prev => !prev)}> back </div></div>
        </Form>
    )
}