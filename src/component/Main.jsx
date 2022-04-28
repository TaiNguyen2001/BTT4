import { useContext, useState } from "react"
import { TodosContext } from "../contexts/todo"
import TodoItem from "./TodoItem"

function Main() {
  const [todosState, dispatch] = useContext(TodosContext)
  const [editingID, setEditingID] = useState(null)
  const getVisibleTodos = function () {
    if (todosState.filter === 'active') {
      return todosState.todos.filter(todo => !todo.isCompleted)
    } else if (todosState.filter === 'completed') {
      return todosState.todos.filter(todo => todo.isCompleted)
    } else {
      return todosState.todos
    }
  }
  const visibleTodos = getVisibleTodos()
  const noTodo = todosState.todos.length === 0 ? 'hidden' : ''
  const onToggleAll = function (event) {
    dispatch({type : 'checkAll', payload : event.target.checked})
  }
  const isAllChecked = todosState.todos.every(todo => todo.isCompleted)
  return (
    <section className={`main ${noTodo}`}>
      <input id='toggle-all' className="toggle-all" type="checkbox" 
      checked={isAllChecked} 
      onChange={onToggleAll}/>
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list">
        {visibleTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} isEditing={editingID === todo.id} setEditingID={setEditingID} />
        ))}
      </ul>
    </section>
  )
}

export default Main