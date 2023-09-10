import { useEffect, useState } from 'react'
import MainNavigation from './components/MainNavigation'
import ErrorComponent from './components/ErrorComponent'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { 
  FetchAgent, 
  FetchContracts,
  FetchSystem, 
  FetchWaypoint 
} from './api/App'
import { 
  setAgent, 
  setContracts, 
  setSystem, 
  setWaypoint 
} from './features/appSlice'
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
  const contracts = useSelector((state) => {
    return state.app.contracts
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if ( agent === null ) { 
      FetchAgent(
        (data) => {
          if ( data.error ) {
            setError(data.error)
            } else {
              dispatch(setAgent(data.data))
            }
        }, 
        (error) => setError(error))
    }

    if ( agent !== null && system === null ) {
      let symbolList = agent.headquarters.split('-')

      FetchSystem(
        `${symbolList[0]}-${symbolList[1]}`,
        (data) => {
          if ( data.error ) {
            setError(data.error)
          } else {
            dispatch(setSystem(data.data))
          }
        },
        (error) => setError(error))
    }

    if ( agent !== null && waypoint === null ) {
      FetchWaypoint(
        agent.headquarters,
        (data) => {
          if ( data.error ) {
            setError(data.error)
          } else {
            dispatch(setWaypoint(data.data))
          }
        },
        (error) => setError(error))
    }

    if ( agent !== null && contracts === null ) {
      FetchContracts(
        (data) => {
          if ( data.error ) {
            setError(data.error)
          } else {
            dispatch(setContracts(data.data))
          }
        },
        (error) => setError(error)
      )
    }
  }, [agent, contracts, dispatch, system, waypoint])

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
