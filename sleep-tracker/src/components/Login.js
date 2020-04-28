import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import * as yup from 'yup'

const LoginStyle =styled.div`
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

            button, .log-in{
                width: 100%;
                height: 30px;
                border-radius: 10px;
            }
    }
`


const blankForm ={
    username: '',
    password: '',
}


const postUser = user => {
    axios.post('https://sleeptrackerbackend.herokuapp.com/api/auth/login', user)
    .then(res =>{
        localStorage.setItem("token",res.data.token)
        console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
}

const formSchema = yup.object().shape({
    
    username: yup
        .string()
        .required('A Username is Required!'),
  
    password: yup
      .string()
      .required('You Must Enter a Password to Proceed'),
});


const Login = _ => { 

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

    const onLogin = evt => {
        evt.preventDefault()

        const userInfo = {
            username: formValues.username,
            password: formValues.password,
        }

        postUser(userInfo)
        history.push('/home')
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
                    {formErrors.username.length > 0 ? (<p>{formErrors.username}</p>) : null}
                    {formErrors.password.length > 0 ? (<p>{formErrors.password}</p>) : null}
                </div>

                <br />

                <input
                    className='log-in'
                    name='logIn'
                    type='submit'
                    value='Log In' />

                <br />< br/>

                <Link to='/signup'>
                    <button>Sign Up</button>
                </Link>
            </form>
        </LoginStyle>
    )
}

export default Login