import './App.css'
import { TodoListContextProvider } from './context/TodosFilterContext'
import FlightSearchApp from './views/FlightSearchApp'

function App() {
  return (
    <div className="App">
      <FlightSearchApp />
    </div>
  )
}

export default App
