import React, { useState } from 'react'
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { submitEditModal, addSleepData, cancelEdit } from '../actions/index.js'
import HomeButton from './buttons/HomeButton'


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

const mapStateToProps = state => {
    return {
        isEditing: state.booleans.isEditing,
        editObj: state.editModal,
        userId: state.userId
        
    }
}

//This will allow us to EITHER add a new piece of data, or edit an existing one, based on if "isEditing" is true.
const EntryView = props => {

    const history = useHistory()
    //set up the initial state for the entry. If we're editing, there will be values for these props. If we're not editing, they will be blank and we can start with a clean slate.
    const [entry, setEntry] = useState(props.editObj)
    
    //These functions manage the form w/ state
    //because of the calendars, we can't use a 'name' attribute to make the code more DRY.
    
    const handleSleep = event => {
        
        setEntry({
            ...entry,
            sleep_start: event
        })
    }

    const handleWake = event => {
        setEntry({
            ...entry,
            sleep_end: event
        })
    }

    const handleMood = event => {
        event.preventDefault()
        setEntry({
            ...entry,
            mood: event.target.name
        })
    }

    //Handle the submission of the form
    const handleSubmitForm = event => {
        event.preventDefault()
        //If we are editing, send a requst to update the edited information
        //calculate the hours slept so we can use it again (TODO: make this more clean)
        const hoursSlept = (Math.round((Date.parse(entry.sleep_end) - Date.parse(entry.sleep_start)) / 360000) / 10)
        
        setEntry({
            ...entry,
            hours: hoursSlept
        })

        if (props.isEditing) {
            //if we're editing, we'll use the appropriate action
            props.submitEditModal(entry)

        } else {
            // If we are adding a new entry, send a post request to do that entry and set the state to not editing anymore.
            
            props.addSleepData({userId: props.userId, sleep_start: entry.sleep_start, sleep_end: entry.sleep_end, hours: hoursSlept, mood: entry.mood})
            //redirect to view all data
            history.push("/view-sleep-data") 
        }
    }

    //Handle the button that navigates back to all entries
    const handleNavToEntries = event => {
        event.preventDefault();
        history.push("/view-sleep-data")
    }

    //If the user wants to cancel their edit without saving changes, call the appropriate action
    const handleCancelEdit = event => {
        event.preventDefault();
        props.cancelEdit();
    }
    
    //display a form with the appropriate buttons
    return(
        <>
        <h1>New Entry</h1>
        {props.isEditing? null : <HomeButton />} {/* if we're not editing then show a home button */}
        <form onSubmit = {handleSubmitForm}>
            <EntryContainer>
                <p className = "entry-container">When did you go to sleep?</p>
                <DateTimePicker value = {entry.sleep_start} onChange = {handleSleep}/>
            </EntryContainer>

            <EntryContainer>
                <p className = "entry-container">When did you wake up?</p>
                <DateTimePicker value = {entry.sleep_end} onChange = {handleWake}/>
            </EntryContainer>

            <EntryContainer>
                <p className = "entry-container">Rate your mood throughout the day.</p>
                <MoodPicker className = "mood-picker">
                    <button name = "1" className = {entry.mood.toString() === "1" ? "selected-mood" : null} onClick = {handleMood} aria-label = "scream emoji">😱</button>
                    <button name = "2" className = {entry.mood.toString() === "2" ? "selected-mood" : null}onClick = {handleMood}  aria-label = "slight frown emoji">😕</button>
                    <button name = "3" className = {entry.mood.toString() === "3" ? "selected-mood" : null}onClick = {handleMood} aria-label = "happy emoji">😊</button>
                    <button name = "4" className = {entry.mood.toString() === "4" ? "selected-mood" : null}onClick = {handleMood} aria-label = "star-eye emoji">🤩</button>
                </MoodPicker>
            </EntryContainer>
            <button>{props.isEditing ? "Update" : "Submit Entry"}</button>
            {/* If we're editing, show a cancel edit button. If we're not editing, show a nav to entries button. */}
            {props.isEditing? <button onClick = {handleCancelEdit}>Cancel Edit</button> : <button onClick = {handleNavToEntries}>Back To All Entries</button>}
            
        </form>
        </>
    )

}




export default connect(mapStateToProps, {submitEditModal, addSleepData, cancelEdit})(EntryView)