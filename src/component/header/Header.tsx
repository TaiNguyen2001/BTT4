import React, { useContext, useReducer, useState } from 'react'
import { reducer, TodosContext } from '../../contexts/todo'
import './Header.css'

function Header () {
  const [text, setText] = useState("")
  const context = useContext(TodosContext)
  const [state, dispatch] = useReducer(reducer, context)
  const changeText = function (e : any) { 
    setText(e.target.value)
  }
  const onKeydownText = function (e : any) {
    const newText = text.trim()
    if (e.keyCode === 13 && newText.length > 0) {
      dispatch({type: "addTask", payload: newText})
      setText("")
      localStorage.setItem('state', JSON.stringify(state))
    }
  }
  return (
      <header  className="header">
        <h1>todos</h1>
        <input className="new-todo" 
        placeholder="What need to be done?" 
        autoFocus
        value={text}
        onChange={changeText} 
        onKeyDown={onKeydownText}/>
      </header>
  )
}

export default Header
