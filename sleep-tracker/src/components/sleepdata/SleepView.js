import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DayDisplayCard from './DayDisplayCard'
import { fetchSleepData } from '../../actions/index'
import { useHistory } from 'react-router-dom'

import HomeButton from '../buttons/HomeButton'


const mapStateToProps = state => {
    return {
        data: state.data,
        isEditing: state.booleans.isEditing,
        isDeleting: state.booleans.isDeleting,
        userId: state.userId
    }
}

//This page calls a card to render the info for each sleep entry belonging to the user
const WeeklyView = props => {

    const history = useHistory()

    //a function to refresh data
    const refreshData = _ => {
        props.fetchSleepData()
    }

    //allows us to navigate to a new entry
    const handleNewNav = event => {
        event.preventDefault()
        history.push('/new-entry')
    }

    //whenever we edit, delete, or render the page for the first time, refresh the data
    useEffect( _ => {
        refreshData() 
    },[props.isEditing, props.isDeleting]) 
    
    //data initializes as null, so we'll wait until the API fetches new data to render
    if (!props.data) {return <h1>Loading...</h1>}
    
    return ( 
        <>
            <h1>Your Nightly Rests</h1> 
            <button onClick = {handleNewNav}>New Entry</button>
            <HomeButton />
        
            {props.data.map(item => {
                if(item.userId.toString() === props.userId) {
                    return <DayDisplayCard key = {item.id} sleepData = {item} refreshData = {refreshData}/>
                }
                
                })}  
        </>
    )

}


export default connect(mapStateToProps, {fetchSleepData})(WeeklyView)