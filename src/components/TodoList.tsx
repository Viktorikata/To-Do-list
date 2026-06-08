import type { Todo } from '../types';
import TodoItem from './TodoItem';

type Props = {
  todos: Todo[];     
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  return (
    <ul>
      {todos.map(t => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TodoList;