import React, { useState } from 'react';
import type { Todo } from '../types';

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;  
    onEdit: (id: string, text: string) => void; 
}

function TodoItem({todo, onToggle, onDelete, onEdit}: Props) {
    const [isEditing, setisEditing] = useState(false);
    const [draft, setDraft] = useState(todo.text);

    const save = () => {
        const trimmed = draft.trim();
        if(trimmed && trimmed !== todo.text) 
        { onEdit(todo.id, trimmed);}
        setisEditing(false);
    }

    const cancel = () => {
        setDraft(todo.text);
        setisEditing(false);
    }


    return (
        <li
            style={{
                display: 'flex',
                alignItems:'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #eee',
                padding: '8px 0',
            }}
            >
                <label style={{display: 'flex', alignItems: 'center', gap: 8, flex: 1}}>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={()=> onToggle(todo.id)}
                    />

                    {isEditing ? (
                        <input 
                            value={draft}
                            autoFocus
                            onChange={(e)=>setDraft(e.target.value)}
                            onKeyDown={(e)=> {
                                if(e.key === 'Enter') save();
                                if (e.key === "Escape") cancel ();
                            }}
                            style= {{flex: 1, padding: '6px 8px', borderRadius: 6, border: '1px solid #ddd'}}
                        />
                        ) : (
                            <span
                                style={{textDecoration: todo.completed ? 'line-through' : 'none',
                                opacity: todo.completed ? 0.6 : 1,}}
                            >
                                {todo.text}
                            </span>
                        )}
                </label>
                <div style={{display:'flex', gap: 8}}>
                    {isEditing ? (
                <>
                 <button onClick={save} style={{padding: '4px 8px'}}>Сохранить</button>
                 <button onClick={cancel} style={{padding: '4px 8px'}}>Отмена</button>
                </>
                ) : (
                <>
                <button onClick={() => setisEditing(true)} style={{padding: '4px 8px'}}>Редакт</button>
                <button onClick={() => onDelete(todo.id)} style={{padding: '4px 8px'}}>Удалить</button>
                </>
                )}
                </div>       
        </li>
    );
}

export default TodoItem;

