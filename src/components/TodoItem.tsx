import { useState } from 'react';
import type { Todo } from '../types';

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;  
    onEdit: (id: string, text: string) => void; 
}

function TodoItem({todo, onToggle, onDelete, onEdit}: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(todo.text); 

    const save = () => {
        const trimmed = draft.trim();
        if(trimmed && trimmed !== todo.text) 
        { onEdit(todo.id, trimmed);}
        setIsEditing(false);
    }

    const cancel = () => {
        setDraft(todo.text);
        setIsEditing(false);
    }


    return (
        <li>
                <label>
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
                                if (e.key === "Escape") cancel();
                            }}
                        />
                        ) : (
                            <span className={todo.completed ? 'completed' : ''}>
                                {todo.text}
                            </span>
                        )}
                </label>
                <div>
                    {isEditing ? (
                <>
                 <button onClick={save}>Сохранить</button>
                 <button onClick={cancel}>Отмена</button>
                </>
                ) : (
                <>
                <button onClick={() => setIsEditing(true)}>Редакт</button>
                <button onClick={() => onDelete(todo.id)}>Удалить</button>
                </>
                )}
                </div>       
        </li>
    );
}

export default TodoItem;

