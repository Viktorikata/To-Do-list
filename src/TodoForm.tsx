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
            onSubmit={handleSubmit} >
            <input
                type="text"
                placeholder='Введите задачу'
                value={text}
                onChange={(e)=> setText(e.target.value)}
            />
            <button type='submit'>Добавить</button>
        </form>
    );
}

export default TodoForm;