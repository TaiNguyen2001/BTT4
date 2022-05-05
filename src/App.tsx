import React from "react"
import Header from "./component/header/Header"
import Main from "./component/main/Main"
import Footer from "./component/footer/Footer"
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
