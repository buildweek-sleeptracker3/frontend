import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { showEditModal } from '../../actions/index'
import EntryView from '../EntryView'

var dateFormat = require('dateformat')
const DayCard = styled.div`


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

const DayDisplayCard = props => {

    const {id, start, end, mood} = props
    const sleepDate = dateFormat(Date.parse(start), "dddd, mmmm dS")
    const sleepStart = dateFormat(Date.parse(start), "h:MM TT")
    const sleepEnd = dateFormat(Date.parse(end), "h:MM TT")
    const hoursSlept = (Math.round((Date.parse(end) - Date.parse(start)) / 360000) / 10)
    
    // const history = useHistory()

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
        {/* <div className = "edit-modal">
            <EntryView />
        </div> */}

        </DayCard>
    )
}

export default connect(mapStateToProps, {showEditModal})(DayDisplayCard)