import {user as dataUser, sleepMood as dataSleepMood, data as dataData} from '../data/dummyData'

const defaultState = {
    user: dataUser,
    data: dataData,
    sleepMood: dataSleepMood
}

export const reducer = (state = defaultState, action) => {

    switch(action.type) {
        default: return state
    }
}