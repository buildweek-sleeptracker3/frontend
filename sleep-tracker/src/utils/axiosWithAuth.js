import axios from "axios"

export const axiosWithAuth = _ => {
    const token = JSON.parse(localStorage.getItem('token'))
    
    return axios.create({
        headers: {
            Authorization: token
        },
        baseURL: "https://sleeptrackerbackend.herokuapp.com"
    })
}