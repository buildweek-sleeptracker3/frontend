import React from 'react'
import { connect } from 'react-redux'
import { Histogram, XAxis, YAxis, BarSeries, DensitySeries } from '@data-ui/histogram'


const mapStateToProps = state => {
    return {
        moodData: state.sleepMood
    }
}
//This renders the sleep/mood calculations
const Dashboard = props => {

    const rawData = [0, 1, 2, 3, 4, 5, 5, 5, 3]
    const keysArray = Object.keys(props.moodData)
    

    const binnedData = keysArray.map(key => {
        return {
            id: key,
            bin: key,
            count: props.moodData[key]
        }
    })
    

    return ( 
        <>

    <h1>Your Sleep Mood</h1>
        <Histogram width = "500" height = "500" binType = "categorical">
            <BarSeries binnedData = {binnedData}/>
            <XAxis />
            <YAxis />
        </Histogram>
        </> 
    )
}


export default connect(mapStateToProps, {})(Dashboard)