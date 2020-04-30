import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as yup from 'yup'
import SignupConfirm from './SignupConfirm';


const SignupStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height:100vh;
    padding: 5px;
    background-color: #121212;

    h1{
        color: #E5EFF2;
    }

    form {
        width:280px;

            label{
                color: #A7A7A7;
            }

            input{
                width: 100%;
                height: 30px;
                padding: 3%;
                font-size: 1.1rem;
                border: none;
                border-radius: 5px 5px 0 0; 
                box-sizing: border-box;
                background-color: #232323;
                color: #E4E4E4;

            }

            .errors p{
                color: red;
            }

            .submit-btn{
                width: 100%;
                height: 35px;
                border-radius: 10px;
                background-color: #39859D;
                color: #E5EFF2;
                font-size:1.2rem;

                &:hover{
                    border: 3px solid white;
                    font-size: 1.3rem;
                    font-weight: bold;
                    height: 45px;
                }

                &:disabled{
                        background-color: #232323;
                        color: #A7A7A7;
                    }
            }
    }
`

const blankForm = {
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    username: '',
    password: '',
}


const formSchema = yup.object().shape({
    first_name: yup
      .string()
      .required('A First Name is Required!'),

    last_name: yup
        .string()
        .required('A Last Name is Rewuired!'),

    age: yup
        .number()
        .positive('Age Cannot be a Negative Number')
        .integer('Age Must be a Whole Number')
        .required('An Age is Required!'),
  
    email: yup
      .string()
      .email('Must Use a VALID Email Address'),

    username: yup
        .string()
        .min(3, 'Username Must be At Least 3 Characters Long')
        .required('You are Required to Select a Username'),
  
    password: yup
      .string()
      .min(3, 'Password Must be At Least 3 Characters Long')
      .required('You Must Create a Password to Proceed'),
});


const Signup = _ => { 

    const [formValues, setFormValues] = useState(blankForm)
    const [formErrors, setFormErrors] = useState(blankForm)
    const [newUserInfo, setNewUserInfo] = useState([])
    const [submitDisabled, setSubmitDisabled] = useState(true)

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

    const postUser = user => {
        axios.post('https://sleeptrackerbackend.herokuapp.com/api/auth/register', user)
        .then(res =>{
          setNewUserInfo([...newUserInfo, res.data])
          console.log(res)
        })
        .catch(err =>{
          console.log(err)
        })
    }

    useEffect(() => {
        formSchema.isValid(formValues)
          .then(valid => { // either true or false
            setSubmitDisabled(!valid)
          })
      }, [formValues])


    const onSubmit = evt => {
        evt.preventDefault()
    
        const newUser = {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            age:formValues.age,
            email: formValues.email,
            username: formValues.username,
            password: formValues.password,
        }
        
        postUser(newUser)
        setFormValues(blankForm)
    }

    return(
        <SignupStyle>
            <h1>Sign Up!</h1> 

            <form onSubmit={onSubmit} >
                <label>First Name <br />
                    <input
                        name='first_name'
                        type='text'
                        value={formValues.firstName}
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Last Name <br />
                    <input
                        name='last_name'
                        type='text'
                        value={formValues.lastName}
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
                        value={formValues.age}
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Email Address <br />
                    <input
                        name='email'
                        type='email'
                        value={formValues.email}
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Select Your Username <br />
                    <input
                        name='username'
                        type='text'
                        value={formValues.username}
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Create Password <br />
                    <input
                        name='password'
                        type='password'
                        value={formValues.password}
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <div className='errors'>
                    <p>{formErrors.firstName}</p>
                    <p>{formErrors.lastName}</p>
                    <p>{formErrors.age}</p>
                    <p>{formErrors.email}</p>
                    <p>{formErrors.username}</p>
                    <p>{formErrors.password}</p>
                </div>

                <br />

                <input 
                    className='submit-btn'
                    name='submit'
                    type='submit'
                    value='Submit'
                    disabled= {submitDisabled} />
            </form>

            <br />

            {
                newUserInfo.map(item =>{
                    return(<SignupConfirm data={item} />)
                })
            }

        </SignupStyle>
    )
}

export default Signup