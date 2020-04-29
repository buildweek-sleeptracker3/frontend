import {sleepMood as dataSleepMood} from '../data/dummyData'

import { LOGIN, SHOW_EDIT_MODAL, CLOSE_EDIT_MODAL, UPDATE_SLEEP_DATA, UPDATE_EDIT, CANCEL_EDIT, DELETE_SLEEP_DATA, DONE_DELETING  } from '../actions/index'

const defaultState = {
    userId: window.localStorage.getItem("userId"),
    data: null,
    sleepMood: dataSleepMood, //still waiting on an endpoint for this
    booleans: {
        isEditing: false,
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
        
        case LOGIN: //update the id upon logging in
        return {
            ...state,
            userId: action.payload
        }

        case SHOW_EDIT_MODAL: //set state to true and get ready
        return {
            ...state,
            booleans: {
                ...state.booleans,
                isEditing: true
            },
            editModal: action.payload
        }
        case CLOSE_EDIT_MODAL: //update state to close modal and clear edit state
            return {
                ...state,
                booleans: {
                    ...state.booleans,
                    isEditing: false
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

        case UPDATE_SLEEP_DATA: //once we've fetched data, update in state
            return{
                ...state,
                data: action.payload
            }

        case UPDATE_EDIT: //update state based on our edit
            let index = ""
        //find the index of where the object with the id i'm editing is 
            state.data.map((datum, i) => {
                if (datum.id === action.payload.id) {
                    index = i
                }
            })
            return {
                ...state,
                [state.data[index]]: action.payload

            }

        case DELETE_SLEEP_DATA: //update state to deleting so that we can trigger our useeffect
        
            return {
                ...state,
                booleans: {
                    ...state.booleans,
                    isDeleting: true
                }
            }

        case DONE_DELETING: //done deleting, update appropriately
           
            return {
                ...state,
                boolans: {
                    ...state.booleans,
                    isDeleting: false
                }
            }

        default: return state
    }
}