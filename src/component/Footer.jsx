import { useContext } from "react"
import { TodosContext } from "../contexts/todo"

function Footer() {
  const [todosState, dispatch] = useContext(TodosContext)
  const activeCount = todosState.todos.filter(todo => (
    !todo.isCompleted
  )).length
  const noTodo = todosState.todos.length === 0 ? 'hidden' : ''
  const isChecked = todosState.todos.some(todo => (todo.isCompleted)) ? '' : 'hidden'
  const isNotCheck = todosState.todos.filter(todo => !todo.isCompleted)
  const getSelectedClass = function (filterName) {
    return todosState.filter === filterName ? 'selected' : ''
  }
  const changeFilter = function (event, filterName) {
    event.preventDefault()
    dispatch({type : "changeFilter" , payload : filterName})
  }
  const deleteCompleted = function () {
    dispatch({type: 'deleteCompleted', payload: isNotCheck})
  }
  return (
    <footer className={`footer ${noTodo}`}>
      <span className="todo-count">
        <strong>{activeCount}</strong> items left
      </span>
      <ul className="filters">
        <li>
          <a href="/" className={getSelectedClass('all')} onClick={(event) => changeFilter(event, 'all')}>All</a>
        </li>
        <li>
          <a href="/" className={getSelectedClass('active')} onClick={(event) => changeFilter(event, 'active')}>Active</a>
        </li>
        <li>
          <a href="/" className={getSelectedClass('completed')} onClick={(event) => changeFilter(event, 'completed')}>Completed</a>
        </li>
      </ul>
      <button className={`clear-completed ${isChecked}`} onClick={deleteCompleted}>Clear Completed</button>
    </footer>
  )
}

export default Footer