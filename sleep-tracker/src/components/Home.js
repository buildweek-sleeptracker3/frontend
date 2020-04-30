import React from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { connect } from 'react-redux'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'


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
        /* text-decoration: */

        &:hover {
            background: grey;
            color: white;
        }
    }

`
const mapStateToProps = state => {
    return {
        moodData: state.sleepMood,
        id: state.userId
    }
}

//This will show a simple home page 
const Home = props => {

    const history = useHistory()


    //Find out what the best number of hours to sleep is for display
    const sleepKeys = Object.keys(props.moodData)
    let maxScore = props.moodData[sleepKeys[0]]
    let maxKey = sleepKeys[0]
    sleepKeys.map(key => {
        if (props.moodData[key] > maxScore) {
            maxScore = props.moodData[key]
            maxKey = key
        }
    })

    
    //handles all nav button clicks with pushes
    const handleButtonClick = event => {
        event.preventDefault()
        console.log(event.target.name)
        switch(event.target.name) {
            case "dashboard": 
                return history.push("/dashboard")
            case "stats":
                return history.push("/view-sleep-data") //this should reflect a week from today
            case "add":
                return history.push("/new-entry")
            default: 
                return null
        }
    }

   
    
    return ( 
    <>
        <h1>Welcome, user number {props.id}</h1>
        <HomeContainer className = "home-container">
            <h2> You're at your best when you get {maxKey} hours of sleep.</h2>
            
            <button name = "dashboard" onClick = {handleButtonClick} >
                Learn more
            </button>
    
        </HomeContainer>
        <HomeContainer className = "home-container">
            <h2>Check out your sleep stats</h2>
            <button name = "stats" onClick = {handleButtonClick}>
                Go now
            </button>
        </HomeContainer>
        <HomeContainer className = "home-container">
            <h2>Create a new entry</h2>
            <button name = "add" onClick = {handleButtonClick}>Add last night's sleep</button>
        </HomeContainer>
    </> )

}

export default connect(mapStateToProps, {})(Home);