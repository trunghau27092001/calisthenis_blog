import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    async function Register(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:3030/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status === 200) {
            alert('Registration successful')
            setRedirect(true)
        }
        else {
            alert('Registration failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <form className="register" onSubmit={Register}>
                <h1>Register</h1>

                <input type="text"
                    placeholder='Username'
                    value={username}
                    onChange={ev => setUsername(ev.target.value)} />
                <input type="password"
                    placeholder='Password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button>Register</button>
            </form>
        </div>
    )
}