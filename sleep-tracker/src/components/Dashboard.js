import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Histogram, XAxis, YAxis, BarSeries, DensitySeries } from '@data-ui/histogram'
import HomeButton from './buttons/HomeButton'
import { fetchSleepData } from '../actions/index'

import { formatData } from '../utils/formatData'

const mapStateToProps = state => {
    return {
        moodData: state.sleepMood,
        rawData: state.data
    }
}

//This renders the sleep/mood calculations
const Dashboard = props => {

    /////////
    useEffect(_ => {
        props.fetchSleepData()

    },[])

    const aggregatedMood = formatData(props.rawData)
    console.log(aggregatedMood)

    

    /////////
    
    //we have to update the shape of the data for it to work with the graphing library
    const binnedData = Object.keys(props.moodData).map(key => {
        return {
            id: key,
            bin: key,
            count: props.moodData[key]
        }
    })
    
    //display a graph of the sleep data vs. mood
    if (!aggregatedMood) {return null}

    return ( 
        <>
            <h1>Your Sleep Mood</h1>
            <HomeButton />
            <Histogram width = "500" height = "500" binType = "categorical">
                <BarSeries binnedData = {aggregatedMood.binned}/>
                <XAxis label = "Hours of sleep"/>
                <YAxis label = "Mood"/>
            </Histogram>
        </> 
    )
}


export default connect(mapStateToProps, {fetchSleepData})(Dashboard)