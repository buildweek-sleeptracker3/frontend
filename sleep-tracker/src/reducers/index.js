import {user as dataUser, sleepMood as dataSleepMood, data as dataData} from '../data/dummyData'

import { SHOW_EDIT_MODAL, SUBMIT_EDIT_MODAL,  } from '../actions/index'

const defaultState = {
    user: dataUser,
    data: dataData,
    sleepMood: dataSleepMood,
    modals: {
        showEditModal: false
    },
    editModal: {
        id: "",
        start: "",
        end: "",
        mood: ""
    }
}

export const reducer = (state = defaultState, action) => {

    switch(action.type) {
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
                    id: "",
                    start: "",
                    end: "",
                    mood: ""
                }
            }
        default: return state
    }
}