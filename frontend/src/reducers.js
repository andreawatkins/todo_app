function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return {
        username: action.username,
        access_token: action.access_token,
      };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "FETCH_TODOS":
      return action.todos;
    case "CLEAR_TODOS":
      return [];
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        description: action.description,
        author: action.author,
        created: action.created,
        checked: false,
        id: action.id,
      };
      return [newTodo, ...state];
    case "DELETE_TODO":
      return state.filter((item) => item.id !== action.id);

    case "TOGGLE_TODO":
      const todos = state.map((item) => {
        if (item.id === action.id) {
          const editedTodo = {
            ...item,
            checked: !item.checked,
            status:
              item.checked === false ? new Date(Date.now()).toString() : "",
          };
          return editedTodo;
        }
        return item;
      });
      return todos;
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
