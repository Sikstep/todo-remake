import s from './Todolist.module.css'
import {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void

}


export const AddItemForm = (props: AddItemFormPropsType) => {

    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        setError('')
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTitle.trim() === '') {
                setNewTitle('')
                setError('Input should be filled!')
                return
            } else {
                props.addItem(newTitle.trim())
                setNewTitle('')
            }
        }
    }
    const onBlurHandler = () => {
        if (newTitle.trim() === '') {
            return setError('Input should be filled!')
        }
    }
    const onClickAddHandler = () => {
        if (newTitle.trim() === '') {
            setError('Input should be filled!')
            setNewTitle('')
            return
        } else {
            props.addItem(newTitle.trim())
            setNewTitle('')
        }
    }

    let inputError = error ? (`${s.input} ${s.inputError}`) : s.input;
    return (
        <div>
            <input className={inputError}
                   value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyHandler}
                   onBlur={onBlurHandler}/>
            <button onClick={onClickAddHandler}
                    disabled={newTitle.trim() === ''}>Add
            </button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}