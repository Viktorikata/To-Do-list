import { useState, useEffect, useMemo } from 'react';
import type { Todo, Filter } from './types'
import TodoForm from './TodoForm';
import TodoList from './components/TodoList';


function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
  try {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
  });
  const [filter, setFilter] = useState<Filter>('all');

  const activeCount = useMemo(
  () => todos.filter(t => !t.completed).length,
  [todos]
  );

  const filteredTodos = useMemo(() => {
  switch (filter) {
    case 'active':
      return todos.filter(t => !t.completed);
    case 'completed':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
  }, [todos, filter]);


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
    <div  className="todo-container">
      <h1>Todo List</h1>
      <p>Форма и список</p>
      
      <TodoForm onAdd={addTodo}/>

        <div className="filter-bar">
          <button
              onClick={()=> setFilter('all')}
             className={filter === 'all' ? 'active' : ''}
          >
            Все
          </button>

          <button
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'active' : ''}
          >
            Активные
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}
          >
            Выполненные
          </button>

            <span> Осталось: {activeCount} </span>

        </div>

      <TodoList
        todos={filteredTodos}
        onEdit={handleEdit}
        onToggle={(id) =>
          setTodos(prev =>
             prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
          )
        }
        onDelete={(id) =>
          setTodos(prev => prev.filter(todo => todo.id !== id))
        }
      />

    </div>
  );
}

export default App;