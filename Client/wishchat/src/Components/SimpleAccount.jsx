import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import '../Styles/Login.css'
export function SimpleAccount() {
    const [name, setName] = useState('');

    let navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSubmit = () => {
        navigate(`/${name}`);

    }
    return (
        <div className="LoginWrapper2">
            <div className='LoginWrapper'>
                <h1> Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" class="InputLabel">Name</label>
                    <input
                        className='AccountInput'
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        required={true}
                        placeholder='Username'
                    />
                    <label htmlFor="password" class="InputLabel">Password</label>

                    <input
                        className='AccountInput'
                        type="password"
                        id="password"
                        name="password"
                        required={true}
                        placeholder='Password'
                    />
                        <input class="SubmitButton" type="submit" />
                </form>

                <div>
                    {name}
                </div>
            </div>
        </div>
    );
}
