import { createContext, useEffect, useReducer } from "react"

const intialState = {
  todos: [],
  filter: "all"
}

type Task = {
  id: string;
  text: string;
  isCompleted: boolean
}

const reducer = function(state, action) {
  switch (action.type) {
    case 'addTask': {
      const newTask = {
        id : Math.random().toString(16),
        text : action.payload,
        isCompleted : false
      }
      return {
        ...state,
        todos: [...state.todos, newTask]
      }
    }
    case 'checkAll': {
      const updatedTodos = state.todos.map(todo => (
        {
          ...todo,
          isCompleted: action.payload
        }
      ))
      return {
        ...state,
        todos : updatedTodos
      }
    }
    case 'changeFilter': {
      return {
        ...state,
        filter: action.payload
      }
    }
    case 'changeTodo': {
      let updatedTodos
      if (action.payload.text.trim() === '') {
        updatedTodos = state.todos.filter(todo => (todo.id !== action.payload.id))
        return {
          ...state,
          todos: updatedTodos
        }
      }
      updatedTodos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text
          }
        }
        return todo
      })
      return {
        ...state,
        todos: updatedTodos
      }
    }
    case 'changeState': {
      const updatedTodos = state.todos.map(todo => {
        if(todo.id === action.payload) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted
          }
        }
        return todo
      })
      return {
        ...state,
        todos: updatedTodos
      }
    }
    case 'removeTask': {
      const updatedTodos = state.todos.filter(todo => (todo.id !== action.payload))
      return {
        ...state,
        todos: updatedTodos
      }
    }
    case "deleteCompleted": {
      const updatedTodos = action.payload
      return {
        ...state,
        todos: updatedTodos
      }
    }
    default: {
      return state
    }
  }
}

export const TodosContext = createContext("")
export const TodosProvider  = ({children}) => {
  const [state, dispatch] = useReducer(reducer, intialState, () => {
    const localData = localStorage.getItem('state')
    return localData ? JSON.parse(localData) : []
  })
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  },[state])
  return <TodosContext.Provider value={[state, dispatch]}>{children}</TodosContext.Provider>
}
