import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { showEditModal } from '../../actions/index'

var dateFormat = require('dateformat')
const DayCard = styled.div`


`
const mapStateToProps = state => {
    return {
        showEditModal: state.modals.showEditModal,
        username: state.user.userName
    }
}

const DayDisplayCard = props => {

    const {start, end, mood} = props
    const sleepDate = dateFormat(Date.parse(start), "dddd, mmmm dS")
    const sleepStart = dateFormat(Date.parse(start), "h:MM TT")
    const sleepEnd = dateFormat(Date.parse(end), "h:MM TT")
    const hoursSlept = (Math.round((Date.parse(end) - Date.parse(start)) / 360000) / 10)
    
    const history = useHistory()

    const handleEdit = event => {
        event.preventDefault()
        props.showEditModal()


    }
    return(
        <DayCard>
        <p>{sleepDate}</p>
        <div className = "sleep-times">
            <p>Asleep: {sleepStart} | Awake: {sleepEnd} | Hours Slept: {hoursSlept}</p>
            <button onClick = {handleEdit}>Edit Entry</button>
            <p>showEditModal: {props.showEditModal}</p>
        </div>

        </DayCard>
    )
}

export default connect(mapStateToProps, {showEditModal})(DayDisplayCard)