import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
export default function ReplenishAmount() {
    const token = useSelector((state) => state.main.token)
    const moneyList = ['USD',
        'RUB',
        'EUR',
        'BTC',]

    const upCurrency = async (event) => {
        event.preventDefault()

        if (typeof event.target[1].value !== 'string') {
            return alert('Incorect')
        }
        console.log(token)
        await axios.post('http://79.120.76.23:8888/add', { type: event.target[0].value, value: event.target[1].value }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }
    return (
        <div className='replenish'>
            <div>
                <h1>Пополнить</h1>
                {/* <InputGroup className="mb-3">

                    <InputGroup.Text id="inputGroup-sizing-default">
                        Счет
                    </InputGroup.Text>
                    <Form.Control
                        placeholder="XXXX - XXXX - XXX -XXXX"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup> */}
                {/* //select money type */}
                <Form onSubmit={event => upCurrency(event)}>
                    <div className='replenish__content'>
                        <FloatingLabel controlId="floatingSelect" label="Works with selects">
                            <Form.Select aria-label="Floating label select example">
                                {moneyList.map(item => <option value={item}>{item}</option>)}
                            </Form.Select>
                        </FloatingLabel>
                        {/* //amount */}
                        <div>введите сумму</div>
                        <InputGroup>
                            <Form.Control type='number' min={0} defaultValue={0} step='any' aria-label="Dollar amount (with dot and two decimal places)" />
                            <InputGroup.Text>$</InputGroup.Text>
                            <InputGroup.Text>0.00</InputGroup.Text>
                        </InputGroup>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}