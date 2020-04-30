import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'



//This will remove tokens from application memory and push you back to the login page
const LogoutButton = _ => {
    const history = useHistory()

    const handleLogoutClick = event => {
        event.preventDefault();
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("userId")
        history.push('/login')
    }
    return (
        <>
            <button onClick = {handleLogoutClick}>Log Out</button>
        </>
    )
}

export default LogoutButton