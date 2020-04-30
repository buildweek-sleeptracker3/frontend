import {sleepMood as dataSleepMood} from '../data/dummyData'

import { LOGIN, SHOW_EDIT_MODAL, CLOSE_EDIT_MODAL, ADD_SLEEP_DATA, DONE_ADDING_DATA, UPDATE_SLEEP_DATA, UPDATE_EDIT, CANCEL_EDIT, DELETE_SLEEP_DATA, DONE_DELETING  } from '../actions/index'

const defaultState = {
    userId: window.localStorage.getItem("userId"),
    data: null,
    sleepMood: dataSleepMood, //still waiting on an endpoint for this
    booleans: {
        isEditing: false,
        isDeleting: false,
        isAdding: false
    },
    editModal: {
        hours: "",
        id: "",
        mood: "",
        sleep_end: new Date(),
        sleep_start: new Date(),
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
                    sleep_end: new Date(),
                    sleep_start: new Date(),
                    userId: ""
                }
            }

        case UPDATE_SLEEP_DATA: //once we've fetched data, update in state
            return{
                ...state,
                data: action.payload
            }

        case UPDATE_EDIT: //update state based on our edit
            // let index = ""
        //find the index of where the object with the id i'm editing is 
            const newArray = state.data.map((datum, i) => {
                if (datum.id === action.payload.id) {
                    return action.payload
                } else {
                    return datum
                }
            })
            return {
                ...state,
                // [state.data[index]]: action.payload
                data: newArray

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
                booleans: {
                    ...state.booleans,
                    isDeleting: false
                }
            }

        case ADD_SLEEP_DATA: 

            return {
                ...state,
                booleans: {
                    ...state.booleans,
                    isAdding: true
                }
            }

        case DONE_ADDING_DATA: 
            
        return {
            ...state,
            data: [
                ...state.data,
                action.payload
            ],
            booleans: {
                ...state.booleans,
                isAdding: false
            }
        }

        default: return state
    }
}