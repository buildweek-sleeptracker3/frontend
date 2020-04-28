import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


const SignupStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 375px;
    padding: 5px;

    form {

            input{
                width: 100%;
                height: 30px;
                border-radius: 5px 5px 0 0; 
                box-sizing: border-box;

            }

            .submit-btn{
                width: 100%;
                height: 30px;
                border-radius: 10px;
            }
    }
`

const blankForm = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
}


const postUser = user => {
    axios.post('https://sleeptrackerbackend.herokuapp.com/api/auth/register', user)
    .then(res =>{
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
}


const Signup = _ => { 

    const [formValues, setFormValues] = useState(blankForm)
    const history = useHistory()

    const onSubmit = evt => {
        evt.preventDefault()
    
        const newUser = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            username: formValues.username,
            password: formValues.password,
        }
        
        postUser(newUser)
        history.push('/dashboard')
    }

    return(
        <SignupStyle>
            <h1>Sign Up!</h1> 

            <form onSubmit={onSubmit} >
                <label>First Name <br />
                    <input
                        name='firstName'
                        type='text'
                    ></input>
                </label>

                <br /><br />

                <label>Last Name <br />
                    <input
                        name='lastName'
                        type='text'
                    ></input>
                </label>

                <br /><br />

                <label>Age <br />
                    <input
                        name='age'
                        type='number'
                        min='2'
                        max='120'
                    ></input>
                </label>

                <br /><br />

                <label>Email Address <br />
                    <input
                        name='email'
                        type='email'
                    ></input>
                </label>

                <br /><br />

                <label>Select Your Username <br />
                    <input
                        name='username'
                        type='text'
                    ></input>
                </label>

                <br /><br />

                <label>Create Password <br />
                    <input
                        name='password'
                        type='password'
                    ></input>
                </label>

                <br /><br />

                <input 
                    className='submit-btn'
                    name='submit'
                    type='submit'
                    value='Submit' />
            </form>

        </SignupStyle>
    )
}

export default Signup