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
        {id: todolistID1, title: 'What to learn', filter: 'active'},
        {id: todolistID2, title: 'What to buy', filter: 'completed'},
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


    const deleteTask = (idTask: string) => {

    }

    const addNewTask = (newTitle: string) => {

    }


    const changeIsDone = (taskId: string, isDoneValue: boolean) => {

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
                      title={el.title}
                      tasks={filteredTasks}
                      deleteTask={deleteTask}
                      addTask={addNewTask}
                      filter={() => {
                      }}
                      changeIsDone={changeIsDone}
                      filterValue={el.filter}/>
        )
    })

    return (
        <div className={s.App}>
            {mappedTodoLists}
        </div>
    );
}

export default App;
