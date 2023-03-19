import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'


const PostItem = ({ postItem }) => {
    const { user } = useAuthContext()

    const [thisPostsComments, setThisPostsComments] = useState(postItem.comments)

    const [newCommentText, setNewCommentText] = useState('')

    const handleAddComment = async (event) => {
        event.preventDefault()

        console.log({ newCommentText })
        console.log(postItem._id)

        const response = await fetch(`http://localhost:3000/posts/comment/${postItem._id}`, {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                newCommentText
            }),
        })


        const responseJSON = await response.json()

        if (responseJSON.status = 'ok') {
            setThisPostsComments([responseJSON.newComment, ...thisPostsComments])
        }
    }

    return <>
        <article
            className='card p-5 w-75 my-3'
        >
            <div>
                {postItem.text}
                <br />
                <span className='fw-lighter fst-italic'>
                    <Link to={`/users/${postItem.author}`}> userID: {postItem.author} </Link>
                </span>
                <br />
            </div>
            {user && <form className='mt-3' onSubmit={handleAddComment}>
                <div className='input-group'>
                    <input
                        type="text"
                        className='form-control'
                        value={newCommentText}
                        onChange={e => setNewCommentText(e.target.value)}
                        aria-label="add todo"
                        aria-describedby="button-add-todo"
                    />
                    <button
                        className="btn btn-outline-success"
                        type="submit"
                        id="button-add-todo"
                    >
                        Comment
                    </button>
                </div>
            </form>}
            {thisPostsComments.length > 0 && <>
                <hr />
                <div className='w-75 mt-3 '>
                    <h6> Comments </h6>
                    {thisPostsComments.map(comment => <div key={comment._id} className='alert alert-primary'>
                        {comment.text}
                        <br />
                        <span className='fw-lighter fst-italic'>
                            <Link to={`/users/${comment.author}`}> userID: {comment.author} </Link>
                        </span>
                    </div>)}
                </div>
            </>}
        </article>
    </>
}

export default PostItem