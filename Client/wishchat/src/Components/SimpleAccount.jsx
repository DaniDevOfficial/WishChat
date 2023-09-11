import React, { useState } from 'react';
import { Link } from 'react-router-dom'
export function SimpleAccount() {
    const [name, setName] = useState('');


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div>
            <form >
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    required={true}
                />
            </form>
            <Link to={`/${name}`}>
                <button>wasd</button>
            </Link>
            <div>
                {name}
            </div>
        </div>
    );
}
