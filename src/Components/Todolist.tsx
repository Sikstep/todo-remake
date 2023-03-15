import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from '../App';
import s from './Todolist.module.css'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
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

        const changeTastTitle = (newTitle: string) => {
            props.changeTaskTitle(todolistID, el.id, newTitle)
        }

        return (
            <li key={el.id} className={el.isDone ? s.taskIsDone : ''}>
                <input type="checkbox"
                       checked={el.isDone}
                       onChange={onChangeCheckHandler}/>
                <EditableSpan title={el.title} changeTaskTitle={changeTastTitle} />
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

    const addNewTask = (newTitle: string) => {
        addTask(todolistID, newTitle)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(todolistID, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTaskTitle={changeTodolistTitle}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addNewTask}/>
            <ul>
                {mappedTasks}
            </ul>
            <button className={filteredValueAll} onClick={filterToAllHandler}>All</button>
            <button className={filteredValueActive} onClick={filterToActiveHandler}>Active</button>
            <button className={filteredValueCompleted} onClick={filterToCompletedHandler}>Completed</button>
        </div>
    );
};

