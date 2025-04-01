import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import FlightSearchApp from './views/FlightSearchApp'
import ResultsPage from './views/ResultsPage'
import DetailsPage from './views/DetailsPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<FlightSearchApp />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/flight-details" element={<DetailsPage />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </>
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App