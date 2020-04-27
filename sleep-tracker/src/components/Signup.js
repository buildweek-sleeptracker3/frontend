import React from 'react'

const Signup = _ => ( 
<div>
    <h1>Signup</h1> 

    <form>
        <label>First Name
            <br />
            <input
                name='first-name'
                type='text'
            ></input>
        </label>

        <br /><br />

        <label>Last Name
            <br />
            <input
                name='last-name'
                type='text'
            ></input>
        </label>

        <br /><br />

        <label>Age
            <br />
            <input></input>
        </label>

        <br /><br />

        <label>Email Address
            <br />
            <input
                name='email'
                type='email'
            ></input>
        </label>

        <br /><br />

        <label>Select Your Username
            <br />
            <input
                name='username'
                type='text'
            ></input>
        </label>

        <br /><br />

        <label>Create Password
            <br />
            <input
                name='password'
                type='password'
            ></input>
        </label>

        <br /><br />

        <button>Submit</button>
    </form>

</div>
)
export default Signup