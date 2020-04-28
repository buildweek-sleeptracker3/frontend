import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { showEditModal } from '../../actions/index'
import EntryView from '../EntryView'

var dateFormat = require('dateformat')
const DayCard = styled.div`

border: 1px solid gray;
width: 60%;
border-radius: 5px;
margin: 2% 0;
padding: 1% 2%;
`
const mapStateToProps = state => {
    return {
        showEditModal: state.modals.showEditModal,
        username: state.user.userName,

        editID: state.editModal.id,
        editStart: state.editModal.start,
        editEnd: state.editModal.end,
        editMood: state.editModal.mood,

        editing: state.modals.showEditModal

    }
}

//Each of these cards renders for every entry in state for data
const DayDisplayCard = props => {

    const {id, start, end, mood} = props

    //format the dates and calculate the hours slept so they can be displayed
    const sleepDate = dateFormat(Date.parse(start), "dddd, mmmm dS")
    const sleepStart = dateFormat(Date.parse(start), "h:MM TT")
    const sleepEnd = dateFormat(Date.parse(end), "h:MM TT")
    const hoursSlept = (Math.round((Date.parse(end) - Date.parse(start)) / 360000) / 10)
    
    

    //when we want to edit, call the action to show the editing and pass it the right data to start off with
    const handleEdit = event => {
        event.preventDefault()
        props.showEditModal({
            id: id,
            start: start,
            end: end,
            mood: mood
        })


    }
    return(
        <DayCard>
            <p>{sleepDate}</p>
            <div className = "sleep-times">
                <p>Asleep: {sleepStart} | Awake: {sleepEnd} | Hours Slept: {hoursSlept}</p>
                <button onClick = {handleEdit}>Edit Entry</button>
            </div>
            {props.editing && props.editID === id ? <EntryView /> : null}

        </DayCard>
    )
}

export default connect(mapStateToProps, {showEditModal})(DayDisplayCard)