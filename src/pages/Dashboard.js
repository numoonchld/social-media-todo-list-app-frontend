import React, { useState, useEffect } from 'react'
import PostItem from '../components/PostItem';

import { useAuthContext } from '../hooks/useAuthContext'

const Dashboard = () => {

    const { user } = useAuthContext()

    const [postText, setPostText] = useState('')

    const [allPosts, setAllPosts] = useState([])

    const getAllPosts = async () => {

        const response = await fetch('http://localhost:3000/posts', {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET',
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {
            setAllPosts(responseJSON.allPosts)
        }

    }

    useEffect(() => {

        getAllPosts()



    }, [])

    const handleAddPost = async (event) => {
        event.preventDefault()

        console.log({ postText })

        const response = await fetch('http://localhost:3000/posts', {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'POST',
            body: JSON.stringify({
                postText
            })
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {

            setAllPosts([responseJSON.post, ...allPosts])
        }
    }

    return <>
        {user && <section
            className='card p-5 w-75 my-5'
        >
            <h5 className='card-title'>Create new post</h5>
            <form onSubmit={handleAddPost}>
                <div className='input-group'>
                    <input
                        type="text"
                        className='form-control'
                        value={postText}
                        onChange={e => setPostText(e.target.value)}
                        aria-label="add todo"
                        aria-describedby="button-add-todo"
                    />
                    <button
                        className="btn btn-outline-success"
                        type="submit"
                        id="button-add-todo"
                    >
                        Add
                    </button>
                </div>
            </form>

        </section>}
        {allPosts.map(postItem => <PostItem key={postItem._id} postItem={postItem} />)}
    </>
}

export default Dashboard