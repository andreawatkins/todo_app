import Todo from "./Todo";

export default function TodoList({ todos = [], dispatch }) {
  return (
    <div>
      {todos.map((t, i) => (
        <>
          <Todo {...t} key={t.id} />
          <input
            type="submit"
            value="delete"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "DELETE_TODO", id: t.id });
            }}
          />
        </>
      ))}
    </div>
  );
}
