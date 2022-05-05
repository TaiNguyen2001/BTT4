import { createContext, useEffect, useReducer } from "react"




interface Actions {
  type: "addTask" | "checkAll" | "changeFilter" | "changeTodo" | "changeState" | "removeTask" | "deleteCompleted",
  payload: any
}

export interface Todo {
  id: string,
  text: string,
  isCompleted: boolean
}

export interface State {
  todos: Todo[],
  filter: string
}

const intialState: State = {
  todos: [],
  filter: "all"
}


export const reducer = function(state: State, action: Actions) {
  switch (action.type) {
    case 'addTask': {
      const newTask : Todo = {
        id : Math.random().toString(16),
        text : action.payload,
        isCompleted : false
      }
      const newState = {
        ...state,
        todos: [...state.todos, newTask]
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    case 'checkAll': {
      const updatedTodos = state.todos.map(todo => (
        {
          ...todo,
          isCompleted: action.payload
        }
      ))
      const newState = {
        ...state,
        todos : updatedTodos
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    case 'changeFilter': {
      const newState = {
        ...state,
        filter: action.payload
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    case 'changeTodo': {
      let updatedTodos
      let newState 
      if (action.payload.text.trim() === '') {
        updatedTodos = state.todos.filter(todo => (todo.id !== action.payload.id))
        newState = {
          ...state,
          todos: updatedTodos
        }
        localStorage.setItem('state', JSON.stringify(newState))
        window.location.reload()
        return newState
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
      newState = {
        ...state,
        todos: updatedTodos
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
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
      const newState = {
        ...state,
        todos: updatedTodos
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    case 'removeTask': {
      const updatedTodos = state.todos.filter(todo => (todo.id !== action.payload))
      const newState = {
        ...state,
        todos: updatedTodos
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    case "deleteCompleted": {
      const updatedTodos = action.payload
      const newState = {
        ...state,
        todos: updatedTodos
      }
      localStorage.setItem('state', JSON.stringify(newState))
      window.location.reload()
      return newState
    }
    default: {
      return state
    }
  }
}

export const TodosContext = createContext(intialState)
export const TodosProvider  = ({children}:any) => {
  const [state,] = useReducer(reducer, intialState,() => {
    const localData = localStorage.getItem('state')
    return localData ? JSON.parse(localData) : intialState
  })
  return <TodosContext.Provider value={state}>{children}</TodosContext.Provider>
}

