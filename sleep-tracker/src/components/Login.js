import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

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

            button{
                width: 100%;
                height: 30px;
                border-radius: 10px;
            }
    }
`

const Login = _ => ( 

<LoginStyle>
    <h1>Login</h1>

    <form>
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
        <button>Log In</button>

        <br />< br/>

        <Link to='/signup'>
            <button>Sign Up</button>
        </Link>
    </form>
</LoginStyle>
)

export default Login