import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

function MainNavigation({ agent, contracts }) {
  MainNavigation.propTypes = {
    agent: PropTypes.object,
    contracts: PropTypes.arrayOf(PropTypes.object),
  }

  const [activeContractCount, setActiveContractCount] = useState(0)
  const pageList = [
    {
      path: '/',
      name: 'SpaceTraders!'
    },
    {
      path: '/fleet',
      name: 'Fleet'
    },
    {
      path: '/location',
      name: 'Location'
    },
    {
      path: '/contracts',
      name: 'Contracts'
    },
    {
      path: '/factions',
      name: 'Factions'
    },
    {
      path: '/systems',
      name: 'Systems'
    }
  ]

  useEffect(() => {
    if (contracts !== null ) {
      let count = 0
      for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].accepted && !contracts[i].fulfilled) {
          count++
        }
      }
      setActiveContractCount(count)
    }
  }, [agent, contracts])

  const currentPage = ({isActive}) => isActive ? 'active' : ''

  return (
    <header id="main-header">
      <nav>
        <ul className="flex">
          { pageList.map((page, index) => (
            <li key={index}>
              <NavLink to={page.path} className={currentPage}>
                {page.name}
              </NavLink>
            </li>
          ))}
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
