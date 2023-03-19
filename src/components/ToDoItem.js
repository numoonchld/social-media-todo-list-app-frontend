import React, { useState } from "react";

const ToDoItem = ({ todoItem }) => {
    const { text, done, _id: id } = todoItem

    const [isDone, setIsDone] = useState(done)
    const [isBusyWithDoneToggle, setIsBusyWithDoneToggle] = useState(false)
    const [toDoText, setToDoText] = useState(text)

    const handleCheckbox = async () => {
        setIsBusyWithDoneToggle(true)


        const response = await fetch(`http://localhost:3000/todos/toggle-done/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'POST',
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {
            setIsDone(responseJSON.newTodoDone)
        }

        setIsBusyWithDoneToggle(false)
    }

    const [isEditFormHidden, setIsEditFormHidden] = useState(true)

    const handleToDoEdit = async () => {
        setIsEditFormHidden(!isEditFormHidden)
    }

    const [newToDoText, setNewToDoText] = useState('')
    const [isBusyWithEditingTodo, setIsBusyWithEditingTodo] = useState(false)

    const handleToDoEditSubmit = async (event) => {
        event.preventDefault()

        setIsBusyWithEditingTodo(true)

        console.log({ newToDoText, id })

        const response = await fetch(`http://localhost:3000/todos/edit-todo/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'PATCH',
            body: JSON.stringify({
                newToDoText
            })
        })

        const responseJSON = await response.json()

        if (responseJSON.status === 'ok') {
            setToDoText(responseJSON.newToDoText)
            setIsEditFormHidden(!isEditFormHidden)
        }

        setIsBusyWithEditingTodo(false)
    }

    const [isThisToDoDeleted, setIsThisToDoDeleted] = useState(false)

    const handleToDoDelete = async () => {

        const response = await fetch(`http://localhost:3000/todos/delete-todo/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            method: 'DELETE',
        })

        const responseJSON = await response.json()
        console.log({ responseJSON })
        if (responseJSON.status === 'ok') {
            setIsThisToDoDeleted(true)
        }
    }

    return (!isThisToDoDeleted ? <>
        <div className="alert alert-light d-flex flex-column">
            <div className="d-flex flex-row justify-content-between" >
                {toDoText}
                <span>
                    <input
                        type='checkbox'
                        checked={isDone}
                        disabled={isBusyWithDoneToggle}
                        onChange={handleCheckbox}
                    />
                </span>
            </div>
            <form
                onSubmit={handleToDoEditSubmit}
                className={`mt-3 ${isEditFormHidden ? 'd-none' : null}`}>
                <div className='input-group'>
                    <button
                        className="btn btn-outline-success"
                        type="submit"
                        id="button-add-todo"
                        disabled={isBusyWithEditingTodo}
                    >
                        Update
                    </button>
                    <input
                        type="text"
                        className='form-control'
                        value={newToDoText}
                        onChange={e => setNewToDoText(e.target.value)}
                        aria-label="add todo"
                        aria-describedby="button-add-todo"
                        disabled={isBusyWithEditingTodo}
                    />

                </div>
            </form>
            <div className="w-100 mt-3 d-flex flex-row justify-content-center ">
                <button
                    type="button"
                    className="btn btn-primary btn-sm mx-3"
                    onClick={handleToDoEdit}
                >
                    {isEditFormHidden ? 'Edit' : 'X'}
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-sm mx-3"
                    onClick={handleToDoDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    </> : null)
}

export default ToDoItem