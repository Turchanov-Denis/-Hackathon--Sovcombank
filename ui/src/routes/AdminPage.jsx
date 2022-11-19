import React from 'react'
import '../scss/_admin.scss'

export default function AdminPage() {
    return (
        <>
            <h1>Admin</h1>
            <div className='admin'>
                <div className='admin__column'><div className='admin__users'></div></div>
                <div className='admin__column'><div className='admin__request'></div></div>
            </div>
        </>
    )
}