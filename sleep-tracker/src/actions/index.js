import axios from 'axios'

//get our list of actions ready for import/export
export const FETCH_MOOD_HISTORY_START = 'FETCH_MOOD_HISTORY_START'
export const FETCH_SLEEP_DATA_START = 'FETCH_SLEEP_DATA_START'
export const FETCH_USER_DATA_START = 'FETCH_USER_DATA_START'
export const FETCH_FAIL = 'FETCH_FAIL'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

export const ADD_ENTRY_START = 'ADD_ENTRY_START'
export const ADD_ENTRY_SUCCESS = 'ADD_ENTRY_SUCCESS'
export const ADD_ENTRY_FAIL = 'ADD_ENTRY_FAIL'

export const EDIT_ENTRY_START = 'EDIT_ENTRY_START'
export const EDIT_ENTRY_SUCCESS = 'EDIT_ENTRY_SUCCESS'
export const EDIT_ENTRY_FAIL = 'EDIT_ENTRY_FAIL'

export const SHOW_EDIT_MODAL = 'SHOW_EDIT_MODAL'
export const HIDE_EDIT_MODAL = 'HIDE_EDIT_MODAL'

//functions for these actions

export const showEditModal = () => dispatch => {
    dispatch({type: SHOW_EDIT_MODAL})
}