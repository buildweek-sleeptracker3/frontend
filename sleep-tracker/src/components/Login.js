import React from 'react'
import {Link} from 'react-router-dom'

const Login = _ => ( 

<div>
    <h1>Login</h1>

    <form>
        <label>Username
            <br />
            <input
                name='username'
                type='text'
            ></input>
        </label>

        <br /><br />

        <label>Password
            <br />
            <input
                name='password'
                type='password'
            ></input>
        </label>

        <br /><br />
        <button>Log In</button>

        <br />
        
        <Link to='/signup'>
            <button>Sign Up</button>
        </Link>
    </form>
</div>
)

export default Login