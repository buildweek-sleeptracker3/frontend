import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { showEditModal, deleteSleepData } from '../../actions/index'
import EntryView from '../EntryView'

var dateFormat = require('dateformat')
const DayCard = styled.div`

border: 1px solid gray;
width: 80%;
border-radius: 5px;
margin: 2% 0;
padding: 1% 2%;
`
const mapStateToProps = state => {
    return {
        editID: state.editModal.id,
        editStart: state.editModal.start,
        editEnd: state.editModal.end,
        editMood: state.editModal.mood,

        editing: state.booleans.isEditing
    }
}

//Each of these cards renders for every entry in state for data
const DayDisplayCard = props => {

    const data = props.sleepData

    //format some variables to display our sleep data
    const sleepDate = dateFormat(Date.parse(data.sleep_start), "dddd, mmmm dS")
    const sleepStart = dateFormat(Date.parse(data.sleep_start), "h:MM TT")
    const sleepEnd = dateFormat(Date.parse(data.sleep_end), "h:MM TT")

    //when we want to edit, call the action to show the editing and pass it the right data to start off with
    const handleEditButton = event => {
        event.preventDefault()
        props.showEditModal(data)
    }

    //To delete data, call the action to delete and pass it the sleep object
    const handleDeleteButton = event => {
        event.preventDefault()
        props.deleteSleepData(data)
    }

    //render a card that displays the data and some buttons to edit or delete the entry
    return(
        <DayCard>
            <p><strong>{sleepDate}</strong></p>
            <div className = "sleep-times">
                <p>Asleep: {sleepStart} | Awake: {sleepEnd} | Asleep for {data.hours} hours. | Mood: {data.mood} </p>
                <button onClick = {handleEditButton}>Edit Entry</button>
                <button onClick = {handleDeleteButton}>Delete Entry</button>
            </div>
            {props.editing && props.editID === data.id ? <EntryView /> : null}

        </DayCard>
    )
}

export default connect(mapStateToProps, {showEditModal, deleteSleepData})(DayDisplayCard)