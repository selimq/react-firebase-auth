import React from 'react'
import { Outlet } from 'react-router'
const Header = () => {
    return (
        <div>
            <div className="h-10 py-10 bg-green-700 text-center text-2xl">Firebase Auth </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Header
