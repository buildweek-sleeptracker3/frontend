import React from 'react'
import { useHistory } from 'react-router-dom'

const HomeButton = _ => {
    const history = useHistory();

    const handleNavHome = event => {
        event.preventDefault();
        history.push("/home")
    }
    return <button onClick = {handleNavHome}>Back Home</button>
}

export default HomeButton