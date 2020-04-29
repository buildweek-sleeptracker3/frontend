import {user as dataUser, sleepMood as dataSleepMood, data as dataData} from '../data/dummyData'

import { LOGIN, SHOW_EDIT_MODAL, SUBMIT_EDIT_MODAL, FETCH_SLEEP_DATA, UPDATE_EDIT, CANCEL_EDIT, DELETE_SLEEP_DATA, DONE_DELETING  } from '../actions/index'

const defaultState = {
    user: dataUser,
    userId: window.localStorage.getItem("userId"),
    data: dataData,
    sleepMood: dataSleepMood,
    modals: {
        showEditModal: false,
        isDeleting: false
    },
    editModal: {
        hours: "",
        id: "",
        mood: "",
        sleep_end: 0,
        sleep_start: 0,
        userId: ""
    }
}

export const reducer = (state = defaultState, action) => {

    switch(action.type) {
        
        case LOGIN: 
        console.log("you have reached the reducer", action.payload)
        return {
            ...state,
            userId: action.payload
        }
        case SHOW_EDIT_MODAL: //set state to true and get ready
        return {
            ...state,
            modals: {
                ...state.modals,
                showEditModal: true
            },
            editModal: action.payload
        }
        case SUBMIT_EDIT_MODAL: //If we're submitting the edit modal then reset editing
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showEditModal: false
                },
                editModal: {
                    hours: "",
                    id: "",
                    mood: "",
                    sleep_end: "",
                    sleep_start: "",
                    userId: ""
                }
            }
        case CANCEL_EDIT:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showEditModal: false
                },
                editModal: {
                    hours: "",
                    id: "",
                    mood: "",
                    sleep_end: "",
                    sleep_start: "",
                    userId: ""
                }
            }
        case FETCH_SLEEP_DATA:
            return{
                ...state,
                data: action.payload
            }
        case UPDATE_EDIT: 
            let index = ""
        //find the index of where the object with the id i'm editing is 
            state.data.map((datum, i) => {
                if (datum.id === action.payload.id) {
                    index = i
                }
            })
            console.log("index:", index)
            return {
                ...state,
                [state.data[index]]: action.payload

            }
        case DELETE_SLEEP_DATA:
            return {
                ...state,
                modals: {
                    ...state.modals,
                    isDeleting: true
                }
            }

        case DONE_DELETING: 
            return {
                ...state,
                [state.modals]: {
                    ...state.modals,
                    isDeleting: false
                }
            }
        default: return state
    }
}