import UserBar from "./user/UserBar"
import TodoList from "./todo/TodoList";
import CreateTodo from "./todo/CreateTodo";
import {useState} from 'react'
import appReducer from "./reducers";
import { useReducer } from 'react'
import {v4 as uuidv4} from 'uuid'


function App() {
  const firstTodos = [
    {
      title: "Clean Kitchen",
      description: "Clean the entire kitchen",
      author: "Andrea",
      created: "Sun October 2 2022 14:15:25 GMT-0500 (Central Daylight Time)",
      id: uuidv4()
    },
    {
      title: "Do laundry",
      description: "Do all the laundry in the hamper and put it away",
      author: "Andrea",
      created: "Sun October 2 2022 14:15:25 GMT-0500 (Central Daylight Time)",
      id: uuidv4(),
    }
   ]
  const [user, setUser] = useState('')
  const [todos, setTodos] = useState(firstTodos)
  
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: firstTodos,
  });


  return (
    
    <div>
    <UserBar user={state.user} dispatch = {dispatch}/>
    <TodoList todos = {state.todos} />
    {state.user && <CreateTodo user={state.user} dispatch = {dispatch} />}
    </div>
  );
}

export default App;
