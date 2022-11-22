import React, { useState, useEffect, useReducer } from "react";
import { useResource } from "react-request-hook";
import { v4 as uuidv4 } from "uuid";

import UserBar from "./user/UserBar";
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";

import appReducer from "./reducers";

import { StateContext } from "./contexts";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const { user } = state;

  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s Todos`;
    } else {
      document.title = "Todos";
    }
  }, [user]);

  const [todos, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  useEffect(() => {
    getTodos();
  }, [state?.user?.access_token]);

  useEffect(() => {
    if (todos && todos.isLoading === false && todos.data) {
      dispatch({ type: "FETCH_TODOS", todos: todos.data.todos.reverse() });
    }
  }, [todos]);

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <React.Suspense fallback={"Loading..."}>
          <UserBar />
        </React.Suspense>
        {todos?.isLoading && "Todos loading..."} <TodoList />
        {state.user && <CreateTodo />}
      </StateContext.Provider>
    </div>
  );
}

export default App;
