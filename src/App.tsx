import React from 'react';
import { useState } from 'react';
import type { Todo } from './types'
import TodoForm from './TodoForm';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
  }

  return (
    <div style={{maxWidth: 680, margin: '48px auto', padding: 24}}>
      <h1>Todo List</h1>
      <p style={{opacity: 0.7, marginTop:8 }}>Форма и список</p>
      
      <TodoForm onAdd={addTodo}/>
      <ul style={{marginTop: 24, padding: 0, listStyle:"none"}}>
        {todos.map(t => (
          <li key={t.id} style={{padding: '8px 0', borderBottom: '1px solid #eee'}}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;