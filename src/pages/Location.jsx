import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SortableTable from '../components/SortableTable'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function Location({ agent, system, waypoint }) {
  Location.propTypes = {
    agent: PropTypes.object,
    system: PropTypes.object,
    waypoint: PropTypes.object,
  }

  const [hasMarket, setHasMarket] = useState(false)
  const columns = [
    'symbol',
    'type',
    'x',
    'y',
  ]

  const waypoints = []

  useEffect(() => {
    if ( waypoint !== null ) {
      setHasMarket(
        waypoint.traits.some((trait) => {
          return trait.name === 'Marketplace'
        })
      )
    }

    console.log('System: ', system)
  }, [agent, system, waypoint])

  return (
    <section>
      { waypoint && (
        <>
          <div className="mb-4">
            <h1>Current Waypoint: {waypoint.symbol}</h1>
            { hasMarket && (
              <>
                <Link to={`/waypoint/${waypoint.symbol}/market`}>
                  <button className="mb-4">Visit Market</button>
                </Link>
              </>
            )}
            <SortableTable
              tableData={[{ ...waypoint }]}
              columns={columns} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <h2>Waypoint Traits</h2>
              <SortableTable
                tableData={waypoint.traits}
                columns={['name', 'description']} />
            </div>
            <div className="flex-1">
              { system && waypoints && (
                <>
                  <h2>Other waypoints in this system:</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Symbol</th>
                        <th>Type</th>
                        <th>Coordinates</th>
                        <th>Travel</th>
                      </tr>
                    </thead>
                    <tbody>
                      { system.waypoints.map((point) => {
                        if ( point.symbol !== waypoint.symbol ) {
                          return (
                            <tr key={point.symbol}>
                              <td>{point.symbol}</td>
                              <td>{point.type}</td>
                              <td>{point.x}, {point.y}</td>
                              <td><Link to={`/waypoint/${point.symbol}`}>View waypoint</Link></td>
                            </tr>
                          )
                        }
                      })}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    agent: state.app.agent,
    system: state.app.system,
    waypoint: state.app.waypoint,
  }
}

export default connect(mapStateToProps)(Location)