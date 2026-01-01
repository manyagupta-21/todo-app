import TodoItem from "./TodoItem";

function TodoList({ todos, onDelete, onToggle }) {
  if (todos.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <ul style={{ padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

export default TodoList;
