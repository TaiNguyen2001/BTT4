import React, { useContext, useLayoutEffect, useReducer, useRef, useState } from "react"
import { TodosContext , reducer} from "../../contexts/todo"


function TodoItem ({todo, isEditing, setEditingID}: any) {
  const [editText, setEditText] = useState(todo.text)
  const context = useContext(TodosContext)
  const [, dispatch] = useReducer(reducer, context)
  const editingClass = isEditing ? "editing" : "" 
  const completedClass = todo.isCompleted ? 'completed' : ''
  const editInputEl = useRef<HTMLInputElement>(null)
  const setTodoIEdit = function () {
    setEditingID(todo.id)
  }
  const changeEditText = function (event : React.ChangeEvent<HTMLInputElement>) {
    setEditText(event.target.value)
  }
  const saveEdit = function (event : React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      dispatch({type: 'changeTodo', payload: {id: todo.id, text: editText}})
      setEditingID(null)
    }
    if (event.key === "Escape") {
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
    if (isEditing && editInputEl.current) {
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
