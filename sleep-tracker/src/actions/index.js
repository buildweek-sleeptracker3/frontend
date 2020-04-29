import { axiosWithAuth } from '../utils/axiosWithAuth'


//Set up exports so that we don't have any typos!
export const LOGIN = 'LOGIN'
export const SHOW_EDIT_MODAL = 'SHOW_EDIT_MODAL'
export const CLOSE_EDIT_MODAL = 'HIDE_EDIT_MODAL'
export const UPDATE_EDIT = 'UPDATE_EDIT'
export const UPDATE_SLEEP_DATA = 'UPDATE_SLEEP_DATA'
export const ADD_SLEEP_DATA = 'ADD_SLEEP_DATA'
export const DONE_ADDING_DATA = 'DONE_ADDING_DATA'
export const DELETE_SLEEP_DATA = 'DELETE_SLEEP_DATA'
export const DONE_DELETING = 'DONT_DELETING'

//These are the actions we'll 'connect' through props

export const login = userId => dispatch => {
    //When the user logs in, the api replies with their userID. We want to update this in state so that we can use it when displaying data and adding new data. We also want it in localstorage so that it is persistent through refreshes, just like the login token.
    window.localStorage.setItem("userId",userId)
    dispatch({type: LOGIN, payload: userId})
}

export const showEditModal = (data) => dispatch => {
    //This reveals an edit form by toggling "isEditing" to true
    dispatch({type: SHOW_EDIT_MODAL, payload: data})
}

export const submitEditModal = data => dispatch => {
    //This function submits the edit modal's contents after closing the form
    dispatch({type: CLOSE_EDIT_MODAL})

    //make a request to edit using the data updated in the edit form
    axiosWithAuth()
        .put(`/api/users/sleep/${data.id}`, data)
        .then(res => {
            console.log(res.data.data)
            //update the datum that we just updated in state... this isn't totally necessary but I wanted to prove that I could
            dispatch({type: UPDATE_EDIT, payload: res.data.data})
        })
        .catch(err => console.log(err))
}

export const cancelEdit = data => dispatch => {
    //change isEditing to false, clear out state for edit data but do not send the put request
    dispatch({type: CLOSE_EDIT_MODAL})
}


export const fetchSleepData = _ => dispatch => {
    //fetches all sleep data from the API. currently the API gives you all sleep data, so we'll filter by userId later.
    axiosWithAuth()
        .get('/api/users/sleep')
        .then(res => {
            dispatch({type: UPDATE_SLEEP_DATA, payload: res.data})
            })
        .catch(err => console.log(err))
}

export const addSleepData = data => dispatch => {
    //post a new piece of sleep data. The response is just a success message, so we can't use it to update our data because we don't have the id of the entry added. Instead we'll just rerender the whole page anyways when we navigate, triggering a fetch.
    dispatch({type: ADD_SLEEP_DATA})
    axiosWithAuth()
        
        .post('/api/users/sleep',data)
        .then(res => {
            console.log(res)
            dispatch({type: DONE_ADDING_DATA})
        })
        .catch(err => console.log(err))
}

export const deleteSleepData = data => dispatch => {
    //delete a piece of sleep data.
    dispatch({type: DELETE_SLEEP_DATA})
    axiosWithAuth()
        .delete(`/api/users/sleep/${data.id}`)
        .then(res => {
            dispatch({type: DONE_DELETING})
            
        })
        .catch(err => console.log(err))
}
