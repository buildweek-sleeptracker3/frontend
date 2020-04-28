import React from 'react'
import styled from 'styled-components'

var dateFormat = require('dateformat')
const DayCard = styled.div`


`

const DayDisplayCard = ({start, end, mood}) => {

    const sleepDate = dateFormat(Date.parse(start), "dddd, mmmm dS")
    const sleepStart = dateFormat(Date.parse(start), "h:MM TT")
    const sleepEnd = dateFormat(Date.parse(end), "h:MM TT")
    const hoursSlept = (Math.round((Date.parse(end) - Date.parse(start)) / 360000) / 10)
    
    return(
        <DayCard>
        <p>{sleepDate}</p>
        <div className = "sleep-times">
            <p>Asleep: {sleepStart} | Awake: {sleepEnd} | Hours Slept: {hoursSlept}</p>
            
        </div>

        </DayCard>
    )
}

export default DayDisplayCard