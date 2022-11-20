import React from 'react'
import { useNavigate } from "react-router-dom";
export default function LeftBar() {
    let navigate = useNavigate();
    return (

        <div className='left-bar' >
            <div onClick={()=>{navigate('/balance')}} className='left-bar__column'><button>Баланс</button></div>
            <div onClick={()=>{navigate('/replenish')}} className='left-bar__column'><button>Пополнить</button></div>
            <div onClick={()=>{navigate('/exchange')}} className='left-bar__column'><button>Биржа</button></div>
            <div onClick={()=>{navigate('/history')}} className='left-bar__column'><button>История</button></div>
            
        </div>

    )
}