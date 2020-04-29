import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DayDisplayCard from './DayDisplayCard'
import { fetchSleepData } from '../../actions/index'


const mapStateToProps = state => {
    return {
        data: state.data,
        isEditing: state.modals.showEditModal,
        isDeleting: state.modals.isDeleting
    }
}

//This page renders all of the data in 'data'. It is called weeklyview because eventually the api request will only get us one week of data at a time.
const WeeklyView = props => {

    const refreshData = _ => {
        props.fetchSleepData()
    }

    useEffect(_ => {
        refreshData() 
    },[props.isEditing, props.isDeleting]) //we want this to refresh whenever the edit view is closed
    
    return ( 
    <>
        <h1>This is the weekly view page</h1> 
       
        {props.data.map(item => {
            // console.log(item)
            return <DayDisplayCard key = {item.id} sleepData = {item} refreshData = {refreshData}/>
        })}
        
    </>)

}


export default connect(mapStateToProps, {fetchSleepData})(WeeklyView)