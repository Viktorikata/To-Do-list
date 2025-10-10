import React from 'react';
import { useState, useEffect } from 'react';
import type { Todo, Filter } from './types'
import TodoForm from './TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if(saved) {
      setTodos(JSON.parse(saved))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const handleEdit = (id:string, newText: string) => {
    const trimmed = newText.trim();
    if(!trimmed) return;
    setTodos(prev => 
      prev.map(t => (t.id === id ? { ...t, text: trimmed} : t))
    );
  };


  return (
    <div style={{maxWidth: 680, margin: '48px auto', padding: 24}}>
      <h1>Todo List</h1>
      <p style={{opacity: 0.7, marginTop:8 }}>Форма и список</p>
      
      <TodoForm onAdd={addTodo}/>

        <div style={{display: 'flex', gap: 8, marginTop: 16}}>
          <button
              onClick={()=> setFilter('all')}
              style={{background: filter === 'all' ? '#222' : '#eee', color: filter === 'all' ? '#fff' : '#000', padding:'6px, 10px', borderRadius: 6, border: 'none', cursor:'pointer'}}
          >
            Все
          </button>

          <button
            onClick={() => setFilter('active')}
            style={{ background: filter === 'active' ? '#222' : '#eee', color: filter === 'active' ? '#fff' : '#000', padding: '6px 10px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
          >
            Активные
          </button>

          <button
            onClick={() => setFilter('completed')}
            style={{ background: filter === 'completed' ? '#222' : '#eee', color: filter === 'completed' ? '#fff' : '#000', padding: '6px 10px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
          >
            Выполненные
          </button>

        </div>

      <ul style={{marginTop: 24, padding: 0, listStyle:"none"}}>

        {todos
          .filter(t=> {
            if (filter === "active") return !t.completed;
            if (filter === "completed") return t.completed;
            return true;
          })
          .map(t => (
          <TodoItem
            key={t.id} 
            todo={t}
            onEdit={handleEdit}
            onToggle={(id)=>
              setTodos(prev =>
                prev.map(todo=>
                  todo.id === id ? {...todo, completed: !todo.completed} : todo              
                )
              )
            }
            onDelete={(id) =>
              setTodos(prev=> prev.filter(todo=> todo.id !== id))
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;