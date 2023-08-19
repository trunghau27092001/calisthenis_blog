import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext)
    useEffect(() => {
        fetch('http://localhost:3030/profile', {
            credentials: 'include'
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, []);

    function logout() {
        if (window.confirm('Are you sure to log out??')) {
            fetch('http://localhost:3030/logout', {
                credentials: 'include',
                method: 'POST'
            }).then(() => {
                setUserInfo(null);
            })
        }
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">TH_BLOG Calisthenis</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/createPost">Create new post</Link>
                        <Link to="/" onClick={logout}>Logout </Link>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login" className="login">Login</Link>
                        <Link to="/register" className="register">Register</Link>
                    </>
                )}

            </nav>
        </header>
    );
}