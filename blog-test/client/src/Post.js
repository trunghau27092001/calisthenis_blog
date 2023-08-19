import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Post({ _id, title, summary, cover, createdAt, author }) {
    return (
        <div className="blog_item">
            <Link to={`/post/${_id}`}>
                <img src={'http://localhost:3030/' + cover} alt="" />
            </Link>
            <div className="info">
                <span>CALISTHENIS BLOG - by {author.username}</span>
                <time>{formatISO9075(new Date(createdAt))}</time>
            </div>
            <Link to={`/post/${_id}`} className='post'>
                <h4>{title}</h4>
                <p>{summary}</p>
            </Link>

        </div>
    )
}