
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login/Login"
import Home from './components/Home/Home'


import './App.css'

const App = ()=> {
 

  
    

    return (
       <div className="App">
        
        <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="about" element={ <Login/> } />
        </Routes>
      </div>
    )
  
}

export default App