import React, { useContext, useReducer, useState } from "react"
import { reducer, TodosContext , Todo} from "../../contexts/todo"
import TodoItem from "./TodoItem"
import './Main.css'

function Main() {
  const context = useContext(TodosContext)
  const [todosState, dispatch] = useReducer(reducer, context)
  const [editingID, setEditingID] = useState(null)
  const getVisibleTodos = function () {
    if (todosState.filter === 'active') {
      return todosState.todos.filter((todo: Todo) => !todo.isCompleted)
    } else if (todosState.filter === 'completed') {
      return todosState.todos.filter((todo: Todo) => todo.isCompleted)
    } else {
      return todosState.todos
    }
  }
  const visibleTodos = getVisibleTodos()
  const noTodo = todosState.todos.length ? '' : 'hidden'
  const onToggleAll = function (event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({type : 'checkAll', payload : event.target.checked})
    localStorage.setItem('state', JSON.stringify(todosState))
  }
  const isAllChecked = todosState.todos.every((todo: Todo) => todo.isCompleted)
  return (
    <section className={`main ${noTodo}`}>
      <input id='toggle-all' className="toggle-all" type="checkbox" 
      checked={isAllChecked} 
      onChange={onToggleAll}/>
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list">
        {visibleTodos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} isEditing={editingID === todo.id} setEditingID={setEditingID} />
        ))}
      </ul>
    </section>
  )
}

export default Main
