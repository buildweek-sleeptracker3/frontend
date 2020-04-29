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
    

    

    /////////
    
    //we have to update the shape of the data for it to work with the graphing library
    const binnedData = Object.keys(props.moodData).map(key => {
        return {
            id: key,
            bin: key,
            count: props.moodData[key]
        }
    })


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

        console.log(maxScore, maxKey)
    }



    //display a graph of the sleep data vs. mood
    if (!aggregatedMood) {return null}

    return ( 
        <>
            <h1>Your Sleep Mood</h1>
            <h2> You're at your best when you get {maxKey} hours of sleep.</h2>

            <HomeButton />
            <Histogram width = "700" height = "500" binType = "categorical">
                <BarSeries binnedData = {aggregatedMood.binned}/>
                <XAxis label = "Hours of sleep"/>
                <YAxis label = "Mood"/>
            </Histogram>
        </> 
    )
}


export default connect(mapStateToProps, {fetchSleepData})(Dashboard)