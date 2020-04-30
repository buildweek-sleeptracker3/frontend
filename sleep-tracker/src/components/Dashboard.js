import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Histogram, XAxis, YAxis, BarSeries, DensitySeries } from '@data-ui/histogram'
import HomeButton from './buttons/HomeButton'
import { fetchSleepData } from '../actions/index'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { formatData } from '../utils/formatData'

import styled from 'styled-components'

const StyledDiv = styled.div`
    margin: 0 2%;
    .graph {
        display: flex;
        justify-content: center;
        background: #a9a9a9;
    }
`

const mapStateToProps = state => {
    return {
        
        userId: state.userId 
    }
}



//This renders the sleep/mood calculations
const Dashboard = props => {

    //set up state for the data
    const [sleepData, setSleepData] = useState([])

    //update state using a get request, done by brian

    useEffect(_ => {
        axiosWithAuth()
        .get('/api/users/sleep')
        .then(res => {
           setSleepData(res.data)
        }) 
        .catch(err => console.log(err))

    },[])
    
    

    //filter the state before feeding it to aggregated mood to format
    const filteredArray =  sleepData.filter(item => {
        return item.userId.toString() === props.userId
    })

    const aggregatedMood = formatData(filteredArray) 
    


    let maxKey = ""
    //calculate when you're at your best
    if(aggregatedMood) {
        const sleepKeys = Object.keys(aggregatedMood.formatted)
        let maxScore = aggregatedMood.formatted[sleepKeys[0]]
        maxKey = sleepKeys[0]
        sleepKeys.map(key => {
            if (aggregatedMood.formatted[key] > maxScore) {
                maxScore = aggregatedMood.formatted[key]
                maxKey = key
            }
        })

        
    }

    //themes for the graph

    const axisStyle = {
        stroke: "#e3e3e3",
        strokeWidth: 2,
        // label: PropTypes.shape({
        //   bottom: PropTypes.object,
        //   top: PropTypes.object,
        // })
    }

    

    //display a graph of the sleep data vs. mood
    if (!aggregatedMood) {return null}

    return ( 
        <StyledDiv>
            <h1>Your Sleep Stats</h1>
            <p> You're at your best when you get {maxKey} hours of sleep.</p>

            
            <div className = "graph">
                <Histogram className = "bar-chart" width = "700" height = "500" binType = "categorical">
                    <BarSeries className = "bar-series" binnedData = {aggregatedMood.binned}/>
                    <XAxis axisStyles = {axisStyle} className = "axis" label = "Hours of sleep"/>
                    <YAxis axisStyles = {axisStyle} className = "axis" label = "Mood"/>
                </Histogram>
            </div>
        </StyledDiv> 
    )
}


export default connect(mapStateToProps, {fetchSleepData})(Dashboard)