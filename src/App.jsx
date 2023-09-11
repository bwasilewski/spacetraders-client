import MainNavigation from './components/MainNavigation'
import ErrorComponent from './components/ErrorComponent'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contracts from './pages/Contracts'
import Location from './pages/Location'
import Marketplace from './pages/Marketplace'
import Factions from './pages/Factions'
import Systems from './pages/Systems'
import Fleet from './pages/Fleet'

function App() {
  return (
    <main>
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/location" element={<Location />} />
          <Route path="/location/market" element={<Marketplace />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/factions" element={<Factions />} />
          <Route path="/systems" element={<Systems />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
