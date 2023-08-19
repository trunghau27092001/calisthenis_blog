import { useEffect, useState } from 'react';
import Post from '../Post';

export default function IndexPost() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3030/post').then(response => {
            response.json().then(posts => {
                setPosts(posts);
            });
        })
    }, [])
    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    )
}