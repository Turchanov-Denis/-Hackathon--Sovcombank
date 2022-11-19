import React from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
export default function LeftBar() {

    return (

        <div className='left-bar' >
            <div className='left-bar__column'><button>Баланс</button></div>
            <div className='left-bar__column'><button>Пополнить</button></div>
            <div className='left-bar__column'><button>Перевести</button></div>
            <div className='left-bar__column'><button>Биржа</button></div>
            
        </div>

    )
}