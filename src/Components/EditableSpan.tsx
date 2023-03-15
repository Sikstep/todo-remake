import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    changeTaskTitle: (newTitle: string) => void

}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setNewTitle(props.title)
    }

    const deactivateViewMode = () => {
        setEditMode(false);
        props.changeTaskTitle(newTitle)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    
    return (
        <>
            {editMode ? <input value={newTitle}
                               onBlur={deactivateViewMode}
                               autoFocus
                               onChange={onChangeTitleHandler}
                /> :
                <span
                    onDoubleClick={activateEditMode}
                >
                    {props.title}</span>
            }
        </>
    )
}