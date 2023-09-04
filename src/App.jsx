import { useEffect, useState } from 'react'
import MainNavigation from './components/MainNavigation'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Factions from './pages/Factions'
import Systems from './pages/Systems'

function App() {
  const [player, setPlayer] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/api/player`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => response.json())
      .then(({data}) => {
        setPlayer(data)
        console.log('Player: ', data)
      })
  }, [])

  return (
    <main>
      <Router>
        <MainNavigation player={player} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/factions" element={<Factions />} />
          <Route path="/systems" element={<Systems />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
