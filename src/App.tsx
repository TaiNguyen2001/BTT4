import React from "react"
import Header from "./component/Header"
import Main from "./component/Main"
import Footer from "./component/Footer"
import { TodosProvider } from "./contexts/todo"

function App() {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </TodosProvider>
    
  )
}

export default App