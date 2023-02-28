import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Components/Todolist';
import {v1} from 'uuid';
import s from './App.module.css';

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterType>('all');

    const deleteTask = (idTask: string) => {
        setTasks([...tasks.filter(el => el.id !== idTask)])
    }

    const addNewTask = (newTitle: string) => {
        setTasks([{id: v1(), title: newTitle, isDone: false}, ...tasks])
    }
    let filteredTasks = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }

    if (filter === 'completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    const changeIsDone = (taskId: string, isDoneValue: boolean) => {
        setTasks([...tasks.map(el => el.id === taskId ? {...el, isDone: isDoneValue} : el)])
    }

    return (
        <div className={s.App}>
            <Todolist
                title={'Learn list'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                addTask={addNewTask}
                filter={setFilter}
                changeIsDone={changeIsDone}
                filterValue={filter}/>

            <Todolist
                title={'Learn list'}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                addTask={addNewTask}
                filter={setFilter}
                changeIsDone={changeIsDone}
                filterValue={filter}/>
        </div>
    );
}

export default App;
