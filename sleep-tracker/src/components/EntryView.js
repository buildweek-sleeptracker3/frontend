import React, { useState } from 'react'
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker'


const EntryContainer = styled.div`


`

const MoodPicker = styled.div`
    display: flex;
   

    button {
        
        border: none;
        border-radius: 5px;
        padding: 2%;
        margin: 0 2%;

        font-size: 1.6rem;

        
    }

    .selected-mood {
        background: #00b16a;
    }
`

const EntryView = _ => {

    const [entry, setEntry] = useState({
        sleep: "",
        wake: "",
        mood: ""
    })
    
    const handleSleep = event => {
        setEntry({
            ...entry,
            sleep: event
        })
    }

    const handleWake = event => {
        setEntry({
            ...entry,
            wake: event
        })
    }

    const handleMood = event => {
        event.preventDefault()
        setEntry({
            ...entry,
            mood: event.target.name
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        //TODO: submit entry to the database, push to weekly view
    }

    return(
        <>
        <h1>New Entry</h1>
        <form onSubmit = {handleSubmit}>
            <EntryContainer>
                <p className = "entry-container">When did you go to sleep?</p>
                <DateTimePicker value = {entry.sleep} onChange = {handleSleep}/>
            </EntryContainer>

            <EntryContainer>
                <p className = "entry-container">When did you wake up?</p>
                <DateTimePicker value = {entry.sleep} onChange = {handleWake}/>
            </EntryContainer>

            <EntryContainer>
                <p className = "entry-container">Rate your mood throughout the day.</p>
                <MoodPicker className = "mood-picker">
                    <button name = "1" className = {entry.mood === "1" ? "selected-mood" : null} onClick = {handleMood} aria-label = "scream emoji">😱</button>
                    <button name = "2" className = {entry.mood === "2" ? "selected-mood" : null}onClick = {handleMood}  aria-label = "slight frown emoji">😕</button>
                    <button name = "3" className = {entry.mood === "3" ? "selected-mood" : null}onClick = {handleMood} aria-label = "happy emoji">😊</button>
                    <button name = "4" className = {entry.mood === "4" ? "selected-mood" : null}onClick = {handleMood} aria-label = "star-eye emoji">🤩</button>
                </MoodPicker>
            </EntryContainer>
            <button>Submit Entry</button>
        </form>
        </>
    )

}




export default EntryView