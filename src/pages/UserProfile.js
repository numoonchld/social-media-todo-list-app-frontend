import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const navigate = useNavigate()

    const { user } = useAuthContext()
    const { userID } = useParams()

    const [UIUserInfo, setUIUserInfo] = useState(null)
    const [UIUserToDos, setUIUserToDos] = useState(null)
    const [UIUserPosts, setUIUserPosts] = useState(null)

    const getUserProfile = async () => {
        const response = await fetch(`http://localhost:3000/user/user-profile/${userID}`, {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'GET',
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {
            const { userInfo, userToDos, userPosts } = responseJSON.userProfile
            console.log({ userPosts })
            setUIUserInfo(userInfo)
            setUIUserToDos(userToDos)
            setUIUserPosts(userPosts)
        }

    }

    useEffect(() => {
        if (user) {
            getUserProfile()
        } else {
            navigate('/login')
        }
    }, [])

    return <>

        {UIUserInfo && <section
            className='bg-secondary text-light card d-flex flex-column justify-content-center align-items-center p-5 w-100'
        >
            <span>{UIUserInfo.username}</span>
            <span>{UIUserInfo.email}</span>
            <span
                className='fw-lighter fst-italic'
            >
                userID: {UIUserInfo._id}
            </span>
        </section>}

        {UIUserToDos && <section
            className='card bg-dark text-light w-100 mt-3 p-5'
        >
            <h5>Todos</h5>
            <br />
            {UIUserToDos.map(todoItem => <div key={todoItem._id}>
                <div className="alert alert-light d-flex flex-column">
                    <div className="d-flex flex-column justify-content-between" >
                        {todoItem.text}
                    </div>
                </div>
            </div>)}
        </section>}

        {UIUserPosts && <section
            className='card w-100 mt-3 p-5'
        >
            <h5>Posts</h5>
            <h6>(and comments)</h6>
            <br />
            {UIUserPosts.reverse().map(postItem => <div key={postItem._id}>
                <div className="card d-flex flex-column justify-content-between p-5 my-3" >
                    {postItem.text}
                    <hr />
                    {postItem.comments.length > 0 && <ul>
                        {postItem.comments.map(comment => <li key={comment._id}>{comment.text}</li>)}
                    </ul>}

                </div>
            </div>)}
        </section>}
    </>
}

export default UserProfile