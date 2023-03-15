import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {v1} from 'uuid';
import s from './App.module.css';

export type TodolistsType = {
    [todolistID: string]: TasksType[]
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TodolistsType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Sugar', isDone: false},
            {id: v1(), title: 'Solt', isDone: false},
        ],
    });


    const deleteTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskId)})
    }
    const addNewTask = (todolistID: string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const changeIsDone = (todolistID: string, taskId: string, isDoneValue: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(task => task.id === taskId ? {...task, isDone: isDoneValue} : task)
        })
    }
    const changeFilterTask = (todolistID: string, newFilterValue: FilterType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistID ? {
            ...todolist,
            filter: newFilterValue
        } : todolist))
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
    }


    let mappedTodoLists = todolists.map(el => {

        let filteredTasks = tasks[el.id]

        if (el.filter === 'active') {
            filteredTasks = tasks[el.id].filter(el => !el.isDone)
        }

        if (el.filter === 'completed') {
            filteredTasks = tasks[el.id].filter(el => el.isDone)
        }

        return (

            <Todolist key={el.id}
                      todolistID={el.id}
                      title={el.title}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      addTask={addNewTask}
                      filter={changeFilterTask}
                      changeIsDone={changeIsDone}
                      filterValue={el.filter}
                      removeTodolist={removeTodolist}/>
        )
    })

    return (
        <div className={s.App}>
            <input /> <button>Add</button>
            {mappedTodoLists}
        </div>
    );
}

export default App;
