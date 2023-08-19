import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:3030/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            })
    }, [])
    if (!postInfo) {
        return '';
    }
    return (
        <div className="postPage">
            <h1 style={{ textAlign: "center", marginBottom: '50px' }}>OUR POST</h1>
            <div className="post-header">
                <div className="header-content">
                    <h1 className="title">{postInfo.title}</h1>
                    <span className="summary">{postInfo.summary}</span>
                </div>
                <img src={`http://localhost:3030/${postInfo.cover}`} alt="" />
            </div>

            <div className="post-content">
                <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>

            </div>

            <div className="post-footer">
                <div className="post-author">
                    <span>CALISTHENIS BLOG - by @{postInfo.author.username}</span>
                    <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
                </div>
                {userInfo.id !== postInfo.author._id ?
                    (<button>RATE THIS POST</button>)
                    :
                    (<Link to={`/edit/${postInfo._id}`}>
                        <button button >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            EDIT THIS POST
                        </button>
                    </Link>)
                }

                <Link to={"/"}>
                    **You have read all the post. Click here to return the homepage
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
            </div >
        </div >
    )
}