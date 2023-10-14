import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/Login.css'
import { toast } from 'react-toastify';
export function SimpleSignUp({ setMe }) {
    const [name, setName] = useState('');

    let navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleSubmit = () => {
        toast.success("Sign up Sucessful");
        navigate(`/Chat`);
        setMe(name)
    }
    return (
        <div className="LoginWrapper2">
            <div className='LoginWrapper'>
                <h1> Sign Up</h1>
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
                    <div className="buttonCenter">
                        <input class="SubmitButton" type="submit" value={"Sign up"} />
                    </div>

                </form>
                <div className="OrLogInText">
                    Or <Link className="LinkTo" to="/SignUp">Sign in</Link>
                </div>
                <div>
                    <div className="smoolText">The Password doesnt get Saved so dont  worry remembering it (this will change in the future)</div>

                </div>
            </div>
        </div>
    );
}
