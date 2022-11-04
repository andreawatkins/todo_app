import Todo from "./Todo";
import { useContext } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { user } = state;
  const { todos } = state;
  const { dispatch } = useContext(StateContext);
  const styles = { border: "1px solid rgba(2.5, 2.5, 2.5, 2.5)" };
  const padding = { marginTop: "10px", marginBottom: "10px" };

  function setStatus(status, checked) {
    if (checked) {
      status = new Date(Date.now()).toString();
    } else {
      status = "";
    }
  }

  const [toggle, handleToggle] = useResource(({ id, checked, status }) => ({
    url: `/todos/${id}`,
    method: "patch",
    data: { checked, status },
  }));

  const [deleted, handleDeleted] = useResource(({ id }) => ({
    url: `/todos/${id}`,
    method: "delete",
  }));

  return (
    <div>
      <div>
        {" "}
        <h2>My Todos: </h2>
      </div>

      {todos.map((t, i) => (
        <>
          <div>
            <div style={styles}>
              <Todo {...t} key={t.id} />
              <input
                id="check"
                type="checkbox"
                checked={t.checked}
                onChange={() => {
                  handleToggle({
                    id: t.id,
                    checked: !t.checked,
                    status:
                      t.checked === false
                        ? new Date(Date.now()).toString()
                        : "",
                  });
                  dispatch({
                    type: "TOGGLE_TODO",
                    id: t.id,
                    checked: t.checked,
                  });
                }}
              />
            </div>
          </div>
          <div style={padding}>
            <input
              type="submit"
              value={"Delete " + '"' + t.title + '"'}
              onClick={(e) => {
                e.preventDefault();
                handleDeleted({
                  id: t.id,
                });
                dispatch({ type: "DELETE_TODO", id: t.id });
              }}
            />
          </div>
        </>
      ))}
    </div>
  );
}
