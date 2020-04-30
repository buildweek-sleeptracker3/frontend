import React from 'react'
import { useHistory } from 'react-router-dom'

//This is a reusable button for navigating home. 
const HomeButton = _ => {
    const history = useHistory();

    const handleNavHome = event => {
        event.preventDefault();
        history.push("/home")
    }
    return <button onClick = {handleNavHome}>Home</button>
}

export default HomeButton