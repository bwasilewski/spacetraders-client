import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import Contract from './pages/Contract'
import Contracts from './pages/Contracts'
import Location from './pages/Location'
import Marketplace from './pages/Marketplace'
import Factions from './pages/Factions'
import Ship from './pages/Ship'
import Systems from './pages/Systems'
import System from './pages/System'
import Fleet from './pages/Fleet'
import Waypoint from './pages/Waypoint'

import MainNavigation from './components/MainNavigation'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const agent = useSelector((state) => {
    return state.app.agent
  })
  const contracts = useSelector((state) => {
    return state.app.contracts
  })
  const system = useSelector((state) => {
    return state.app.system
  })
  const waypoint = useSelector((state) => {
    return state.app.waypoint
  })
  const [loadingAgent, setLoadingAgent] = useState(false)
  const [loadingContracts, setLoadingContracts] = useState(false)
  const [loadingSystem, setLoadingSystem] = useState(false)
  const [loadingWaypoint, setLoadingWaypoint] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    if ( !loadingAgent ) {
      if ( agent === null && error === null ) {
        setLoadingAgent(true)
        FetchAgent(
          (data) => {
            setLoadingAgent(false)
            if (data.data) {
              dispatch(setAgent(data.data))
            }
            if (data.error) {
              setError(data.error)
              console.error(data.error)
            }
          },
          (error) => {
            setLoadingAgent(false)
            setError(error)
            console.error(error)
          }
        )
      }
    }

    if ( !loadingSystem ) {
      if ( agent !== null && system === null ) {
        setLoadingSystem(true)
        const { headquarters } = agent
        const splitSymbol = headquarters.split('-')
        FetchSystem(
          `${splitSymbol[0]}-${splitSymbol[1]}`,
          (data) => {
            setLoadingSystem(false)
            if (data.data) {
              dispatch(setSystem(data.data))
            }
            if (data.error) {
              setError(data.error)
              console.error(data.error)
            }
          },
          (error) => {
            setLoadingSystem(false)
            setError(error)
            console.error(error)
          }
        )
      }
    }

    if ( !loadingWaypoint ) {
      if ( agent !== null && waypoint === null ) {
        const { headquarters } = agent
        setLoadingWaypoint(true)
        FetchWaypoint(
          headquarters,
          (data) => {
            setLoadingWaypoint(false)
            if( data.error ) {
              setError(data.error)
              console.error(data.error)
            }
            else {
              dispatch(setWaypoint(data))
            }
          },
          (error) => {
            setLoadingWaypoint(false)
            setError(error)
            console.error(error)
          }
        )
      }
    }

    if ( !loadingContracts ) {
      if ( agent !== null && contracts === null ) {
        setLoadingContracts(true)
        FetchContracts(
          (data) => {
            setLoadingContracts(false)
            if (data.data) {
              dispatch(setContracts(data.data))
            }
            if (data.error) {
              setError(data.error)
              console.error(data.error)
            }
            setIsLoading(false)
          },
          (error) => {
            setLoadingContracts(false)
            setError(error)
            console.error(error)
          }
        )
      }
    }

    if ( loadingAgent === false && loadingSystem === false && loadingWaypoint === false && loadingContracts === false ) {
      setIsLoading(false)
    } 

  }, [dispatch, agent, contracts, error, isLoading, loadingAgent, loadingContracts, loadingWaypoint, loadingSystem, system, waypoint])
  return (
    <main>
      { !isLoading && (
        <Router>
          { agent !== null && contracts !== null && (
            <MainNavigation agent={agent} contracts={contracts} />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/fleet/:symbol" element={<Ship />} />
            <Route path="/location" element={<Location />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/contracts/:id" element={<Contract />} />
            <Route path="/factions" element={<Factions />} />
            <Route path="/systems" element={<Systems />} />
            <Route path="/systems/:symbol" element={<System />} />
            <Route path="/waypoint/:symbol" element={<Waypoint />} />
            <Route path="/waypoint/:symbol/market" element={<Marketplace />} />
          </Routes>
        </Router>
      )}
    </main>
  )
}

export default App
