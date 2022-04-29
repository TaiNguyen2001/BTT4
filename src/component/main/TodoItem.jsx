import { useContext, useLayoutEffect, useRef, useState } from "react"
import { TodosContext } from "../../contexts/todo"

function TodoItem ({todo, isEditing, setEditingID}) {
  const [editText, setEditText] = useState(todo.text)
  const [, dispatch] = useContext(TodosContext)
  const editingClass = isEditing ? "editing" : "" 
  const completedClass = todo.isCompleted ? 'completed' : ''
  const editInputEl = useRef(null)
  const setTodoIEdit = function () {
    setEditingID(todo.id)
  }
  const changeEditText = function (event) {
    setEditText(event.target.value)
  }
  const saveEdit = function (event) {
    if (event.keyCode === 13) {
      dispatch({type: 'changeTodo', payload: {id: todo.id, text: editText}})
      setEditingID(null)
    }
    if (event.keyCode === 27) {
      setEditText(todo.text)
      setEditingID(null)
    }
  }
  const changeState = function () {
    dispatch({type: "changeState", payload: todo.id})
  }
  const removeTask = function () {
    dispatch({type: "removeTask", payload: todo.id})
  }

  useLayoutEffect(() => {
    if (isEditing) {
      editInputEl.current.focus()
    }
  })
  return (
    <li className={`${editingClass} ${completedClass}`}>
      <div className="view">
        <input type="checkbox" className="toggle" 
        checked={todo.isCompleted} 
        value={todo.isCompleted} 
        onChange={changeState}/>
        <label onDoubleClick={setTodoIEdit}>{todo.text}</label>
        <button className="destroy" onClick={removeTask}></button>
      </div>
      {isEditing && <input ref={editInputEl} 
      className="edit" value={editText} 
      onChange={changeEditText} 
      onKeyDown={saveEdit}></input>}
    </li>
  )
}

export default TodoItem
