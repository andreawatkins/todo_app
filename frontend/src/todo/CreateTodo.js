import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { StateContext } from "../contexts";
import { useResource } from "react-request-hook";
import { useEffect } from "react";

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ title, description, author, created, checked, status }) => ({
      url: "/todos",
      method: "post",
      data: { title, description, author, created, checked, status },
    })
  );

  function handleCreate() {
    createTodo({ title, description, author: user });
    dispatch({
      type: "CREATE_TODO",
      title: title,
      description: description,
      author: user,
      created: todo.data.created,
      checked: false,
      status: "Incomplete",
      id: uuidv4(),
    });
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  useEffect(() => {
    if (todo?.error) {
      setError(true);
      //alert("Something went wrong creating post.");
    }
    if (todo?.isLoading === false && todo?.data) {
      dispatch({
        type: "CREATE_TODO",
        title: todo.data.title,
        description: todo.data.description,
        checked: todo.data.checked,
        status: todo.data.status,
        author: todo.data.author,
        id: todo.data.id,
      });
    }
  }, [todo]);

  return (
    <div>
      <div>
        {" "}
        <h2>Create Todo: </h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTodo({
            title,
            description,
            author: user,
            created: new Date(Date.now()).toString(),
            checked: false,
            status: "",
          });
        }}
      >
        <div>
          Author: <b>{user}</b>
        </div>
        <div>
          <label htmlFor="create-title">Title:</label>
          <div>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              name="create-title"
              id="create-title"
            />
          </div>
        </div>

        <label htmlFor="create-description">Description:</label>
        <div>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            name="create-description"
            id="create-description"
          />
        </div>
        <input type="submit" value="Create" disabled={title.length === 0} />
      </form>
    </div>
  );
}
