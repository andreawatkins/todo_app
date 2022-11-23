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

  const [toggle, handleToggle] = useResource(
    ({ id, title, description, author, checked, created, status }) => ({
      url: `/todo/${id}`,
      method: "put",
      data: { title, description, author, created, checked, status },
      headers: { Authorization: `${state.user.access_token}` },
    })
  );

  const [deleted, handleDeleted] = useResource(({ id }) => ({
    url: `/todo/${id}`,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  return (
    <div>
      <div>
        {" "}
        <h2>My Todos: </h2>
      </div>

      {todos.length === 0 && <h2> No posts found. </h2>}
      {todos !== undefined &&
        todos.length > 0 &&
        todos.map((t, i) => (
          <>
            <div>
              <div style={styles}>
                <Todo {...t} key={t._id} />
                <input
                  id="check"
                  type="checkbox"
                  checked={t.checked}
                  onChange={() => {
                    const currentId = t._id;
                    const currentChecked = t.checked;
                    handleToggle({
                      id: currentId,
                      title: t.title,
                      description: t.description,
                      checked: !t.checked,
                      created: t.created,
                      author: t.author,
                      status:
                        t.checked === false
                          ? new Date(Date.now()).toString()
                          : "",
                    });
                    dispatch({
                      type: "TOGGLE_TODO",
                      id: currentId,
                      checked: currentChecked,
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
                    id: t._id,
                  });
                  dispatch({ type: "DELETE_TODO", id: t._id });
                }}
              />
            </div>
          </>
        ))}
    </div>
  );
}
