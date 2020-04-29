import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DayDisplayCard from './DayDisplayCard'
import { fetchSleepData } from '../../actions/index'
import { useHistory } from 'react-router-dom'

import HomeButton from '../buttons/HomeButton'


const mapStateToProps = state => {
    return {
        data: state.data,
        isEditing: state.modals.showEditModal,
        isDeleting: state.modals.isDeleting
    }
}

//This page renders all of the data in 'data'. It is called weeklyview because eventually the api request will only get us one week of data at a time.
const WeeklyView = props => {

    const history = useHistory()

    const refreshData = _ => {
        props.fetchSleepData()
    }

    const handleNew = event => {
        event.preventDefault()
        history.push("/entry/new-entry")
    }

    useEffect(_ => {
        refreshData() 
    },[props.isEditing, props.isDeleting]) //we want this to refresh whenever the edit view is closed
    
    if (!props.data) {return <h1>Loading...</h1>}
    return ( 
    <>
        <h1>This is the weekly view page</h1> 
        <button onClick = {handleNew}>New Entry</button>
        <HomeButton />
       
        {props.data.map(item => {
            // console.log(item)
            return <DayDisplayCard key = {item.id} sleepData = {item} refreshData = {refreshData}/>
        })}
        
    </>)

}


export default connect(mapStateToProps, {fetchSleepData})(WeeklyView)