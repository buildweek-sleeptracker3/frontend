import React, { useState } from 'react'
import styled from 'styled-components'
import DateTimePicker from 'react-datetime-picker'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { submitEditModal, addSleepData } from '../actions/index.js'


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
        // hours: state.editModal.hours,
        // id: state.editModal.id,
        // sleep_start: state.editModal.sleep_start,
        // sleep_end: state.editModal.sleep_end,
        // mood: state.editModal.mood,
        // userId: state.editModal.userId,
        isEditing: state.modals.showEditModal,
        editObj: state.editModal
        
    }
}
const EntryView = props => {
    // console.log(props.editObj)

    const history = useHistory()
    //set up the initial state for the entry. If we're editing, there will be values for these props. If we're not editing, they will be blank and we can start with a clean slate.
    const [entry, setEntry] = useState(props.editObj)
    
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

    const handleSubmit = event => {
        event.preventDefault()
        //If we are editing, send a requst to update the edited information
        if (props.isEditing) {
            props.submitEditModal(entry)

        } else {
        //If we are adding a new entry, send a post request to do that entry and set the state to not editing anymore.
            //TODO: calculate the hours, dynamic userID
            props.addSleepData({userId: 8, sleep_start: entry.sleep_start, sleep_end: entry.sleep_end, hours: entry.hours, mood: entry.mood})
            history.push("/weekly-view/date")
        }
    }
    
    return(
        <>
        <h1>New Entry</h1>
        <form onSubmit = {handleSubmit}>
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
        </form>
        </>
    )

}




export default connect(mapStateToProps, {submitEditModal, addSleepData})(EntryView)