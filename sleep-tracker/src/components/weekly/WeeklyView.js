import React from 'react'
import { connect } from 'react-redux'
import DayDisplayCard from './DayDisplayCard'


const mapStateToProps = state => {
    return {
        data: state.data
    }
}
const WeeklyView = props => {
    
    
    return ( 
    <>
        <h1>This is the weekly view page</h1> 
        {props.data.map(item => {
            return <DayDisplayCard start = {item.start} end = {item.end} mood = {item.mood}/>
        })}
        
    </>)

}


export default connect(mapStateToProps, {})(WeeklyView)