import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function MainNavigation({player}) {

  // props validation
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  MainNavigation.propTypes = {
    player: PropTypes.shape({
      credits: PropTypes.number,
      headquarters: PropTypes.string,
      startingFaction: PropTypes.string,
      symbol: PropTypes.string
    })
  }

  return (
    <header id="main-header">
      <nav>
        <ul className="flex">
          <li>SpaceTraders!</li>
          <li>
            <Link to="/">Home</Link>
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
        <ul className="flex">
          <li>{player.symbol}</li>
          <li>Headquarters: {player.headquarters}</li>
          <li>C: {player.credits}</li>
          <li>Faction: {player.startingFaction}</li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
