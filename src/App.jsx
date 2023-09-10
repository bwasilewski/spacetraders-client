import { useEffect, useState } from 'react'
import MainNavigation from './components/MainNavigation'
import ErrorComponent from './components/ErrorComponent'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setAgent, setSystem, setWaypoint } from './features/appSlice'
import Home from './pages/Home'
import Contracts from './pages/Contracts'
import Location from './pages/Location'
import Marketplace from './pages/Marketplace'
import Factions from './pages/Factions'
import Systems from './pages/Systems'
import Fleet from './pages/Fleet'

function App() {
  const [error, setError] = useState(null)
  const agent = useSelector((state) => {
    return state.app.agent
  })
  const system = useSelector((state) => {
    return state.app.system
  })
  const waypoint = useSelector((state) => {
    return state.app.waypoint
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if ( agent === null ) { 
      fetch(`http://localhost:3000/api/player`, {
      })
        .then((response) => response.json())
        .then((data) => {
          if ( data.error ) {
            setError(data.error)
          } else {
            dispatch(setAgent(data.data))
          }
        })
        .catch((error) => {
          setError(error)
        })
    }

    if ( agent !== null && system === null ) {
      let { headquarters } = agent
      let splitSymbol = headquarters.split('-')
      let systemSymbol = `${splitSymbol[0]}-${splitSymbol[1]}`
      fetch(`http://localhost:3000/api/system/${systemSymbol}`, {
      })
        .then((response) => response.json())
        .then((data) => {
          if ( data.error ) {
            setError(data.error)
          } else {
            dispatch(setSystem(data.data))
          }
        })
        .catch((error) => {
          setError(error)
        })
    }

    if ( agent !== null && waypoint === null ) {
      let { headquarters } = agent
      let splitSymbol = headquarters.split('-')
      let systemSymbol = `${splitSymbol[0]}-${splitSymbol[1]}`
      fetch(`http://localhost:3000/api/system/${systemSymbol}/waypoint/${headquarters}`, {
      })
        .then((response) => response.json())
        .then((data) => {
          if ( data.error ) {
            setError(data.error)
          } else {
            dispatch(setWaypoint(data.data))
          }
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [agent, dispatch, system, waypoint])

  return (
    <main>
      <Router>
        <MainNavigation />
        { error && <ErrorComponent error={error} /> }
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
