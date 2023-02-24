import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from '../App';
import s from './Todolist.module.css'

type TodolistType = {
    title: string
    tasks: TasksType[]
    deleteTask: (idTask: string) => void
    addTask: (newTitle: string) => void
    filter: (filter: FilterType) => void
    changeIsDone: (taskID: string, isDoneValue: boolean) => void
    filterValue: FilterType
}

export const Todolist: React.FC<TodolistType> = ({
                                                     tasks,
                                                     title,
                                                     deleteTask,
                                                     addTask,
                                                     filter,
                                                     changeIsDone, filterValue,
                                                     ...props
                                                 }) => {

    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState('');
    const onClickDeleteHandler = (id: string) => {
        deleteTask(id)
    }


    const mappedTasks = tasks.map(el => {
        const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeIsDone(el.id, e.currentTarget.checked)
        }
        return (
            <li key={el.id} className={el.isDone ? s.taskIsDone : ''}>
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
        setError('')
    }

    const onClickAddHandler = () => {
        if (newTitle.trim() === '') {
            setError('Input should be filled!')
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
                setError('Input should be filled!')
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

    const onBlurHandler = () => {
        if (newTitle.trim() === '') {
            return setError('Input should be filled!')
        }
    }

    let inputError = error ? (`${s.input} ${s.inputError}`) : s.input;
    let filteredValueAll = filterValue === 'all' ? s.buttonActive : '';
    let filteredValueActive = filterValue === 'active' ? s.buttonActive : '';
    let filteredValueCompleted = filterValue === 'completed' ? s.buttonActive : '';
    return (
        <div>
            <h3>{title}</h3>
            <input className={inputError} value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyHandler}
                   onBlur={onBlurHandler}/>
            <button onClick={onClickAddHandler}
                    disabled={newTitle.trim() === ''}>Add
            </button>
            {error && <div className={s.errorMessage}>{error}</div>}
            <ol>
                {mappedTasks}
            </ol>
            <button className={filteredValueAll} onClick={filterToAllHandler}>All</button>
            <button className={filteredValueActive} onClick={filterToActiveHandler}>Active</button>
            <button className={filteredValueCompleted} onClick={filterToCompletedHandler}>Completed</button>
        </div>
    );
};

