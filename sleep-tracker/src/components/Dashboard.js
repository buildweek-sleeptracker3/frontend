import React from 'react'
import { connect } from 'react-redux'
import { Histogram, XAxis, YAxis, BarSeries, DensitySeries } from '@data-ui/histogram'
import HomeButton from './buttons/HomeButton'

const mapStateToProps = state => {
    return {
        moodData: state.sleepMood
    }
}

//This renders the sleep/mood calculations
const Dashboard = props => {

    
    //we have to update the shape of the data for it to work with the graphing library
    const binnedData = Object.keys(props.moodData).map(key => {
        return {
            id: key,
            bin: key,
            count: props.moodData[key]
        }
    })
    
    //display a graph of the sleep data vs. mood
    return ( 
        <>
            <h1>Your Sleep Mood</h1>
            <HomeButton />
            <Histogram width = "500" height = "500" binType = "categorical">
                <BarSeries binnedData = {binnedData}/>
                <XAxis label = "Hours of sleep"/>
                <YAxis label = "Mood"/>
            </Histogram>
        </> 
    )
}


export default connect(mapStateToProps, {})(Dashboard)