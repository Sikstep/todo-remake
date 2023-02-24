import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from '../App';

type TodolistType = {
    title: string
    tasks: TasksType[]
    deleteTask: (idTask: string) => void
    addTask: (newTitle: string) => void
    filter: (filter: FilterType) => void
    changeIsDone: (taskID: string, isDoneValue: boolean) => void
}

export const Todolist: React.FC<TodolistType> = ({tasks, title, deleteTask, addTask, filter, changeIsDone}) => {

    const [newTitle, setNewTitle] = useState('');
    const onClickDeleteHandler = (id: string) => {
        deleteTask(id)
    }


    const mappedTasks = tasks.map(el => {
        const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeIsDone(el.id, e.currentTarget.checked)
        }
        return (
            <li key={el.id}>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={onChangeCheckHandler}/>
                {el.title}
                <button onClick={() => onClickDeleteHandler(el.id)}>x</button>
            </li>
        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onClickAddHandler = () => {
        if (newTitle.trim() === '') {
            setNewTitle('')
            return
        } else {
            addTask(newTitle.trim())
            setNewTitle('')
        }
    }

    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTitle.trim() === '') {
                setNewTitle('')
                return
            } else {
                addTask(newTitle.trim())
                setNewTitle('')
            }
        }
    }

    const filterToAllHandler = () => {
        filter('all')
    }

    const filterToActiveHandler = () => {
        filter('active')
    }

    const filterToCompletedHandler = () => {
        filter('completed')
    }

    return (
        <div>
            <h3>{title}</h3>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyHandler}/>
            <button onClick={onClickAddHandler}>Add</button>
            <ol>
                {mappedTasks}
            </ol>
            <button onClick={filterToAllHandler}>All</button>
            <button onClick={filterToActiveHandler}>Active</button>
            <button onClick={filterToCompletedHandler}>Completed</button>
        </div>
    );
};

