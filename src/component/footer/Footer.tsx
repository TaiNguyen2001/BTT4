import { useContext, useReducer } from "react"
import { reducer, TodosContext, Todo } from "../../contexts/todo"
import './Footer.css'

function Footer() {
  const context = useContext(TodosContext)
  const [todosState, dispatch] = useReducer(reducer, context)
  const activeCount = todosState.todos.filter((todo: Todo) => (
    !todo.isCompleted
  )).length
  const noTodo = todosState.todos.length ? '': 'hidden'
  const isChecked = todosState.todos.some((todo: Todo) => (todo.isCompleted)) ? '' : 'hidden'
  const isUncheck = todosState.todos.filter((todo: Todo) => !todo.isCompleted)
  const getSelectedClass = function (filterName: any) {
    return todosState.filter === filterName ? 'selected' : ''
  }
  const changeFilter = function (event: any, filterName: any) {
    event.preventDefault()
    dispatch({type : "changeFilter" , payload : filterName})
  }
  const deleteCompleted = function () {
    dispatch({type: 'deleteCompleted', payload: isUncheck})
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
