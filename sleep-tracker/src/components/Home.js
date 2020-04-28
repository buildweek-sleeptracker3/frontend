import React from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { connect } from 'react-redux'

/*TODO:
    -axios request to get initial "best sleep"
    -fill in URL for weekly stats to be set to 6 days ago
    -general styling (esp mobile)
    -If last night's entry is present, tell the user they already did that
*/

const HomeContainer = styled.div`

    max-width: 800px;
    border: 2px solid gray;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    padding: 4%;
    margin: 4% 2%;

    h2 {
        padding: 0;
        margin: 0;
    }

    button {
        align-self: flex-end;
        font-size: 1rem;
        border-radius: 5px;
        background: white;
        text-decoration:

        &:hover {
            background: grey;
            color: white;
        }
    }

`
const mapStateToProps = state => {
    return {
        name: state.user.firstName
    }
}

const Home = props => {

    const history = useHistory()

    const handleClick = event => {
        event.preventDefault()
        console.log(event.target.name)
        switch(event.target.name) {
            case "optimal": 
                return history.push("/optimal-sleep")
            case "stats":
                return history.push("/weekly-view/date") //this should reflect a week from today
            case "add":
                return history.push("/entry/new-entry")
            default: 
                return null
        }
    }
    
    return ( 
    <>
    <h1>Welcome back, {props.name}</h1>
    <HomeContainer className = "home-container">
        <h2> You're at your best when you get 8 hours of sleep.</h2>
        
        <button name = "optimal" onClick = {handleClick} >
            Learn more
        </button>
 
    </HomeContainer>
    <HomeContainer className = "home-container">
        <h2>Check out your weekly stats</h2>
        <button name = "stats" onClick = {handleClick}>
            Go now
        </button>
    </HomeContainer>
    <HomeContainer className = "home-container">
        <h2>Create a new entry</h2>
        <button name = "add" onClick = {handleClick}>Add last night's sleep</button>
    </HomeContainer>
    </> )

}

export default connect(mapStateToProps, {})(Home);