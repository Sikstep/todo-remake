import React, {ChangeEvent, KeyboardEvent, useState, MouseEvent} from 'react';
import {FilterType, TasksType} from '../App';
import s from './Todolist.module.css'

type TodolistType = {
    todolistID: string
    title: string
    tasks: TasksType[]
    deleteTask: (todolistID: string, idTask: string) => void
    addTask: (todolistID: string, newTitle: string) => void
    filter: (todolistID: string, filter: FilterType) => void
    changeIsDone: (todolistID: string, taskID: string, isDoneValue: boolean) => void
    filterValue: FilterType
    removeTodolist: (todolistID: string) => void
}

export const Todolist: React.FC<TodolistType> = ({
                                                     todolistID,
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
        deleteTask(todolistID, id)
    }


    const mappedTasks = tasks.map(el => {
        const onChangeCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeIsDone(todolistID, el.id, e.currentTarget.checked)
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
            addTask(todolistID ,newTitle.trim())
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
                addTask(todolistID ,newTitle.trim())
                setNewTitle('')
            }
        }
    }

    const filterToAllHandler = () => {
        filter(todolistID,'all')
    }

    const filterToActiveHandler = () => {
        filter(todolistID,'active')
    }

    const filterToCompletedHandler = () => {
        filter(todolistID,'completed')
    }

    const onBlurHandler = () => {
        if (newTitle.trim() === '') {
            return setError('Input should be filled!')
        }
    }

    const removeTodolistHandler = () => {
        props.removeTodolist(todolistID)
    }

    let inputError = error ? (`${s.input} ${s.inputError}`) : s.input;
    let filteredValueAll = filterValue === 'all' ? s.buttonActive : '';
    let filteredValueActive = filterValue === 'active' ? s.buttonActive : '';
    let filteredValueCompleted = filterValue === 'completed' ? s.buttonActive : '';
    return (
        <div>
            <div className={s.todolist_title}><h3>{title}</h3>
                <button onClick={removeTodolistHandler}>X</button>
            </div>
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

