import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from '../App';
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm';

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
    const filterToAllHandler = () => {
        filter(todolistID, 'all')
    }
    const filterToActiveHandler = () => {
        filter(todolistID, 'active')
    }
    const filterToCompletedHandler = () => {
        filter(todolistID, 'completed')
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(todolistID)
    }


    let filteredValueAll = filterValue === 'all' ? s.buttonActive : '';
    let filteredValueActive = filterValue === 'active' ? s.buttonActive : '';
    let filteredValueCompleted = filterValue === 'completed' ? s.buttonActive : '';
    return (
        <div>
            <h3>{title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addTask={addTask} todolistID={todolistID}/>
            <ul>
                {mappedTasks}
            </ul>
            <button className={filteredValueAll} onClick={filterToAllHandler}>All</button>
            <button className={filteredValueActive} onClick={filterToActiveHandler}>Active</button>
            <button className={filteredValueCompleted} onClick={filterToCompletedHandler}>Completed</button>
        </div>
    );
};

