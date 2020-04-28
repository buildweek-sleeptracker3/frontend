import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

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
      console.log(res)
    })
    .catch(err =>{
      console.log(err)
    })
}


const Login = _ => { 

    const [formValues, setFormValues] = useState(blankForm)

    const onLogin = evt => {
        evt.preventDefault()

        const userInfo = {
            username: formValues.username,
            password: formValues.password,
        }

        postUser(userInfo)
        setFormValues(blankForm)
    }

    return(
        <LoginStyle>
            <h1>Login</h1>

            <form onSubmit={onLogin}>
                <label>Username <br />
                    <input
                        name='username'
                        type='text'
                    ></input>
                </label>

                <br /><br />

                <label>Password   <br />
                    <input
                        name='password'
                        type='password'
                    ></input>
                </label>

                <br /><br />
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