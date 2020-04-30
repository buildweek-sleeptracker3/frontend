import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DayDisplayCard from './DayDisplayCard'
import { fetchSleepData } from '../../actions/index'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const StyledDiv = styled.div`
    padding: 0 2%;
    display: flex;
    flex-direction: column;
    align-items: center;


    .sleep-head {
        display: flex;
        justify-content: space-between;
        width: 80%;

        button {
            height: 40px;
            align-self: center;
        }

    }


`
const mapStateToProps = state => {
    return {
        data: state.data,
        isEditing: state.booleans.isEditing,
        isDeleting: state.booleans.isDeleting,
        isAdding: state.booleans.isAdding,
        userId: state.userId
    }
}

//This page calls a card to render the info for each sleep entry belonging to the user
const SleepView = props => {

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
    },[props.isAdding]) //props.isEditing, props.isAdding, props.isDeleting
    
    //data initializes as null, so we'll wait until the API fetches new data to render
    if (props.data.length === 0) {return <h1>Loading...</h1>}
    
    return ( 
        <StyledDiv>
            <div className = "sleep-head">
                <h1>Sleep Diary</h1> 
                <button onClick = {handleNewNav}>+ New Entry</button>
            </div>
            
        
            {/* display a card for each entry for that user */}
            {props.data.filter(item => {
                return item.userId == props.userId
            }).map(item => {
                return <DayDisplayCard key = {item.id} sleepData = {item} refreshData = {refreshData}/>
            })  
            }
                
                 
        </StyledDiv>
    )

}


export default connect(mapStateToProps, {fetchSleepData})(SleepView)