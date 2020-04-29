import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'

//get our list of actions ready for import/export

// export const FETCH_SLEEP_DATA_START = 'FETCH_SLEEP_DATA_START'
// export const FETCH_USER_DATA_START = 'FETCH_USER_DATA_START'
// export const FETCH_FAIL = 'FETCH_FAIL'
// export const FETCH_SUCCESS = 'FETCH_SUCCESS'

// export const ADD_ENTRY_START = 'ADD_ENTRY_START'
// export const ADD_ENTRY_SUCCESS = 'ADD_ENTRY_SUCCESS'
// export const ADD_ENTRY_FAIL = 'ADD_ENTRY_FAIL'

// export const EDIT_ENTRY_START = 'EDIT_ENTRY_START'
// export const EDIT_ENTRY_SUCCESS = 'EDIT_ENTRY_SUCCESS'
// export const EDIT_ENTRY_FAIL = 'EDIT_ENTRY_FAIL'

export const SHOW_EDIT_MODAL = 'SHOW_EDIT_MODAL'
export const SUBMIT_EDIT_MODAL = 'HIDE_EDIT_MODAL'
export const UPDATE_EDIT = 'UPDATE_EDIT'
export const FETCH_SLEEP_DATA = 'FETCH_SLEEP_DATA'

export const ADD_SLEEP_DATA = 'ADD_SLEEP_DATA'

export const DELETE_SLEEP_DATA = 'DELETE_SLEEP_DATA'
export const DONE_DELETING = 'DONT_DELETING'

export const LOGIN = "LOGIN"

//functions for these actions

export const login = userId => dispatch => {
    dispatch({type: LOGIN, payload: userId})
}

export const showEditModal = (data) => dispatch => {
    dispatch({type: SHOW_EDIT_MODAL, payload: data})
}

export const submitEditModal = data => dispatch => {
    dispatch({type: SUBMIT_EDIT_MODAL})
    //make a request to edit using the data
    axiosWithAuth()
        .put(`/api/users/sleep/${data.id}`, data)
        .then(res => {
            console.log(res.data.data)
            //update the datum that we just updated in state
            dispatch({type: UPDATE_EDIT, payload: res.data.data})
        })
        .catch(err => console.log(err))
}


export const fetchSleepData = _ => dispatch => {
    axiosWithAuth()
        .get('/api/users/sleep')
        .then(res => {
            // console.log(res)
            dispatch({type: FETCH_SLEEP_DATA, payload: res.data})
            })
        .catch(err => console.log(err))
}

export const addSleepData = data => dispatch => {
    console.log(data)
    axiosWithAuth()
        .post('/api/users/sleep',data)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

export const deleteSleepData = data => dispatch => {
    dispatch({type: DELETE_SLEEP_DATA})
    axiosWithAuth()
        .delete(`/api/users/sleep/${data.id}`)
        .then(res => {
            console.log(res)
            dispatch({type: DONE_DELETING})
            
        })
        .catch(err => console.log(err))
}
