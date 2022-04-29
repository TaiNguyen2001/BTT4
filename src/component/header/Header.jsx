import { useContext, useState } from 'react'
import { TodosContext } from '../../contexts/todo'
import './Header.css'

function Header () {
  const [text, setText] = useState("")
  const [, dispatch] = useContext(TodosContext)
  const changeText = function (e) { 
    setText(e.target.value)
  }
  const onKeydownText = function (e) {
    const newText = text.trim()
    if (e.keyCode === 13 && newText.length > 0) {
      dispatch({type: 'addTask', payload: newText})
      setText("")
    }
  }
  return (
    <header className="header">
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
