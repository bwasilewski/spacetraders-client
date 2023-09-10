import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MainNavigation() {
  const [activeContractCount, setActiveContractCount] = useState(0)
  const agent = useSelector((state) => {
    return state.app.agent
  })
  const contracts = useSelector((state) => {
    return state.app.contracts
  })

  useEffect(() => {
    if (contracts !== null) {
      let count = 0
      for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].accepted && !contracts[i].fulfilled) {
          count++
        }
      }
      setActiveContractCount(count)
    }
  }, [contracts])

  return (
    <header id="main-header">
      <nav>
        <ul className="flex">
          <li>
            <Link to="/">SpaceTraders!</Link>
          </li>
          <li>
            <Link to="/fleet">Fleet</Link>
          </li>
          <li>
            <Link to="/location">Location</Link>
          </li>
          <li>
            <Link to="/contracts">Contracts</Link>
          </li>
          <li>
            <Link to="/factions">Factions</Link>
          </li>
          <li>
            <Link to="/systems">Systems</Link>
          </li>
        </ul>
        {agent && (
          <ul className="flex">
            <li>{agent.symbol}</li>
            <li>
              Headquarters: <Link to="/location">{agent.headquarters}</Link>
            </li>
            <li>C: {agent.credits}</li>
            <li>Faction: {agent.startingFaction}</li>
            { activeContractCount > 0 && (
              <li>
                Active Contracts: {activeContractCount} 
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  )
}

export default MainNavigation
