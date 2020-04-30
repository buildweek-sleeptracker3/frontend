import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Confirmation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height:100vh;
    padding: 5px;
    background-color: #121212;

        h1{
            color: #39859D;
            text-align: center;
        }

        h3{
            color: #A7A7A7;
        }

        div{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            width: 260px;

                p{
                    box-sizing: border-box;
                    width:100%;
                    background-color: #232323;
                    border-radius: 10px;
                    height: 35px;
                    padding:3%;
                    color: #E5EFF2;
                }

                span{
                    color: #39859D;
                    font-weight: bold;
                    border-bottom: 2px solid #39859D;
                }
        }

        button{
            width: 175px;
            height: 35px;
            font-size: 1.2rem;
            border: 5px, solid, #25859D;
            border-radius: 10px;
            background-color: #39859D;
            color: #E5EFF2;

            &:hover{
                    border: 3px solid white;
                    font-size: 1.3rem;
                    font-weight: bold;
                    height: 45px;
                }
        }
`

const SignupConfirm = props => {

    return(
        <Confirmation>
            <h1>Thank You For Siging Up!</h1>
            <h3>Your Profile Details Are Below</h3>

            <div className='userDetials'>
                <p><span>Name:</span> &nbsp; {props.data.first_name} {props.data.last_name}</p>
                <p><span>Age:</span> &nbsp; {props.data.age}</p>
                <p><span>Email:</span> &nbsp; {props.data.email}</p>
                <p><span>Username:</span> &nbsp; {props.data.username}</p>
            </div>

            <br />

            <Link to='/login'>
                <button>Login</button>
            </Link>
        </Confirmation>
    )
}

export default SignupConfirm