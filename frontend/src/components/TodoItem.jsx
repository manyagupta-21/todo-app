function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li style={styles.item}>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#9ca3af" : "#111",
        }}
      >
        {todo.title}
      </span>

      <div>
        <button style={styles.tick} onClick={() => onToggle(todo.id)}>
          ✓
        </button>
        <button style={styles.delete} onClick={() => onDelete(todo.id)}>
          ✕
        </button>
      </div>
    </li>
  );
}

export default TodoItem;

const styles = {
  item: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  tick: {
    background: "transparent",
    border: "none",
    color: "#22c55e",
    fontSize: "18px",
    cursor: "pointer",
    marginRight: "8px",
  },
  delete: {
    background: "transparent",
    border: "none",
    color: "#ef4444",
    fontSize: "18px",
    cursor: "pointer",
  },
};
