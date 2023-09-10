import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MainNavigation() {
  const agent = useSelector((state) => {
    return state.app.agent
  })

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
          </ul>
        )}
      </nav>
    </header>
  )
}

export default MainNavigation
