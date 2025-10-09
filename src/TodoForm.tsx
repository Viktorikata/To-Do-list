import React, { useState } from 'react';
import type { FormEvent } from 'react'; 

type Props = {
    onAdd: (text: string) => void;
}

function TodoForm({onAdd}: Props) {
    const [text, setText] = useState("");

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setText('');
    }


    return (
        <form
            onSubmit={handleSubmit} 
            style={{display: "flex", gap: 8, marginTop: 24 }}>
            <input
                type="text"
                placeholder='Введите задачу'
                value={text}
                onChange={(e)=> setText(e.target.value)}
                style={{flex: 1, padding:10, borderRadius:8, border: '1px solid #ddd'}}
            />
            <button
                type='submit'
                    style={{ padding: "10px, 16px", borderRadius:8, border:'none', background: '#222', color:'#fff', cursor:'pointer'}}>
                     Добавить
            </button>
        </form>
    );
}

export default TodoForm;