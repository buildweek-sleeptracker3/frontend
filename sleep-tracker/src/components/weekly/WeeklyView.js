import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DayDisplayCard from './DayDisplayCard'
import { fetchSleepData } from '../../actions/index'


const mapStateToProps = state => {
    return {
        data: state.data
    }
}

//This page renders all of the data in 'data'. It is called weeklyview because eventually the api request will only get us one week of data at a time.
const WeeklyView = props => {
    const refreshData = _ => {
        props.fetchSleepData()
    }

    useEffect(_ => {
        refreshData() 
    },[])
    //TODO: add a button to request data from a new week
    return ( 
    <>
        <h1>This is the weekly view page</h1> 
        {props.data.map(item => {
            return <DayDisplayCard key = {item.id} id = {item.id} start = {item.start} end = {item.end} mood = {item.mood}/>
        })}
        
    </>)

}


export default connect(mapStateToProps, {fetchSleepData})(WeeklyView)