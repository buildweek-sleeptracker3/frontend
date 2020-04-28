import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import * as yup from 'yup'


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


const formSchema = yup.object().shape({
    firtsName: yup
      .string()
      .required('A First Name is Required!'),

    lastName: yup
        .string()
        .required('A Last Name is Rewuired!'),

    age: yup
        .number()
        .positive('Age Cannot be a Negative Number')
        .integer('Age Must be a Whole Number')
        .required('An Age is Required!'),
  
    email: yup
      .string()
      .email('Must Use a VALID Email Address')
      .required('Email Address is Required!'),

    username: yup
        .string()
        .required('You are Required to Select a Username'),
  
    password: yup
      .string()
      .required('You Must Create a Password to Proceed'),
});


const Signup = _ => { 

    const [formValues, setFormValues] = useState(blankForm)
    const [formErrors, setFormErrors] = useState(blankForm)
    const history = useHistory()

    const inputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value
    
        yup
          .reach(formSchema, name)
          .validate(value)
          .then(valid =>{
            setFormErrors(
              {...formErrors,
              [name]:''})
          })
          .catch(err =>{
            setFormErrors(
              {...formErrors, 
              [name]: err.errors[0]})
          })
    
        setFormValues({
          ...formValues,
          [name]: value
        })
      }

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
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Last Name <br />
                    <input
                        name='lastName'
                        type='text'
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Age <br />
                    <input
                        name='age'
                        type='number'
                        min='2'
                        max='120'
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Email Address <br />
                    <input
                        name='email'
                        type='email'
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Select Your Username <br />
                    <input
                        name='username'
                        type='text'
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Create Password <br />
                    <input
                        name='password'
                        type='password'
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                {/* <div className='errors'>
                    {formErrors.firstName.length > 0 ? (<p>{formErrors.firstName}</p>) : null}
                    {formErrors.lastName.length > 0 ? (<p>{formErrors.lastName}</p>) : null}
                    {formErrors.age.length > 0 ? (<p>{formErrors.age}</p>) : null}
                    {formErrors.email.length > 0 ? (<p>{formErrors.email}</p>) : null} 
                    {formErrors.username.length > 0 ? (<p>{formErrors.username}</p>) : null}
                    {formErrors.password.length > 0 ? (<p>{formErrors.password}</p>) : null}
                </div> */}

                <br />

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