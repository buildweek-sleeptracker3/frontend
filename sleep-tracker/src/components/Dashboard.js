import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Histogram, XAxis, YAxis, BarSeries, DensitySeries } from '@data-ui/histogram'
import HomeButton from './buttons/HomeButton'
import { fetchSleepData } from '../actions/index'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { formatData } from '../utils/formatData'


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
    axiosWithAuth()
        .get('/api/users/sleep')
        .then(res => {
           setSleepData(res.data)
        }) 
        .catch(err => console.log(err))
    

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