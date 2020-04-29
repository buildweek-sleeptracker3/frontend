import React from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { connect } from 'react-redux'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
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
        moodData: state.sleepMood,
        id: state.userId
    }
}

const Home = props => {

    
    const sleepKeys = Object.keys(props.moodData)
    let maxScore = props.moodData[sleepKeys[0]]
    let maxKey = sleepKeys[0]
    sleepKeys.map(key => {
        if (props.moodData[key] > maxScore) {
            maxScore = props.moodData[key]
            maxKey = key
        }
    })

    // console.log(maxScore, maxKey)

    

    const history = useHistory()

    const handleClick = event => {
        event.preventDefault()
        console.log(event.target.name)
        switch(event.target.name) {
            case "dashboard": 
                return history.push("/dashboard")
            case "stats":
                return history.push("/weekly-view/date") //this should reflect a week from today
            case "add":
                return history.push("/entry/new-entry")
            default: 
                return null
        }
    }

    const handleTemp = event => {
        event.preventDefault();

        
        //test create
        // axios.post(`https://sleeptrackerbackend.herokuapp.com/api/auth/register`,{username: "victoriat", password: "12345", first_name: "victoria", last_name: "topham", age: 26})
        // .then(res => console.log(res))
        // .catch(err => console.log(err))


        // test login
        // axios.post(`https://sleeptrackerbackend.herokuapp.com/api/auth/login`,{username: "CodyD", password: "12345"})
        // .then(res => localStorage.setItem("token",res.data.token))
        // .catch(err => console.log(err))

        //test get user
        // axiosWithAuth()
        //     .get('/api/users')
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
    }
    
    return ( 
    <>
    <h1>Welcome, user number {props.id}</h1>
    {/* <button onClick = {handleTemp}>Click me to log in</button> */}
    <HomeContainer className = "home-container">
        <h2> You're at your best when you get {maxKey} hours of sleep.</h2>
        
        <button name = "dashboard" onClick = {handleClick} >
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