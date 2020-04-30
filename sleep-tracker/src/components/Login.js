import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../actions/index'
import styled from 'styled-components'
import axios from 'axios'
import * as yup from 'yup'

const LoginStyle =styled.div`
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

            .log-in{
                width: 100%;
                height: 35px;
                border-radius: 10px;
                background-color: #39859D;
                color: #E5EFF2;

                    &:disabled{
                        background-color: #232323;
                        color: #A7A7A7;
                    }
            }

            .signUp{
                width: 100%;
                height: 35px;
                font-size: 1.2rem;
                border: 5px, solid, #25859D;
                border-radius: 10px;
                background-color: #121212;
                color: #25859D;
            }

    }
`


const blankForm ={
    username: '',
    password: '',
}



const formSchema = yup.object().shape({
    
    username: yup
        .string()
        .required('A Username is Required!'),
  
    password: yup
      .string()
      .required('You Must Enter a Password to Proceed'),
});


const Login = props => { 

    const postUser = user => {
        axios.post('https://sleeptrackerbackend.herokuapp.com/api/auth/login', user)
        .then(res =>{
            localStorage.setItem("token",JSON.stringify(res.data.token))
            props.login(res.data.userId)
            console.log(res)
            history.push('/home')
            
        })
        .catch(err =>{
          console.log(err)
        })
    }

    const [formValues, setFormValues] = useState(blankForm)
    const [formErrors, setFormErrors] = useState(blankForm)
    const [submitDisabled, setSubmitDisabled] = useState(true)
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

    useEffect(() => {
        formSchema.isValid(formValues)
          .then(valid => { // either true or false
            setSubmitDisabled(!valid)
          })
      }, [formValues])


    const onLogin = evt => {
        evt.preventDefault()

        const userInfo = {
            username: formValues.username,
            password: formValues.password,
        }

        postUser(userInfo)
        
    }

    return(
        <LoginStyle>
            <h1>Login</h1>

            <form onSubmit={onLogin}>
                <label>Username <br />
                    <input
                        name='username'
                        type='text'
                        value={formValues.username}
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <label>Password   <br />
                    <input
                        name='password'
                        type='password'
                        value={formValues.password}
                        onChange={inputChange}
                    ></input>
                </label>

                <br /><br />

                <div className='errors'>
                    <p>{formErrors.username}</p>
                    <p>{formErrors.password}</p>
                </div>

                <br />

                <input
                    className='log-in'
                    name='logIn'
                    type='submit'
                    value='Log In' 
                    disabled={submitDisabled}/>

                <br />< br/>

                <Link to='/signup'>
                    <button className='signUp'>Sign Up</button>
                </Link>
            </form>
        </LoginStyle>
    )
}

export default connect(null, {login})(Login)