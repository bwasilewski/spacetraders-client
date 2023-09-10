import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SortableTable from '../components/SortableTable'
import { Link } from 'react-router-dom'

function Location() {
  const [waypoints, setWaypoints] = useState(null)
  const [hasMarket, setHasMarket] = useState(false)
  const currentWaypoint = useSelector((state) => {
    return state.app.waypoint
  })
  const columns = [
    'symbol',
    'type',
    'x',
    'y',
  ]

  useEffect(() => {
    if ( currentWaypoint ) {
      setHasMarket(currentWaypoint.traits.find((trait) => {
        return trait.name === 'Marketplace'
      }))
      let { systemSymbol } = currentWaypoint
      fetch(`http://localhost:3000/api/system/${systemSymbol}/waypoints`, {
      })
        .then((response) => response.json())
        .then((data) => {
          if ( data.error ) {
            console.log(data.error)
          } else {
            setWaypoints(data.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [currentWaypoint])

  return (
    <>
      <section>
        { currentWaypoint && (
          <>
            <h1>Current Waypoint: {currentWaypoint.symbol}</h1>
            { hasMarket && (
              <>
                <Link to="/location/market">
                  <button>Visit Market</button>
                </Link>
              </>
            )}
            <SortableTable
              tableData={[{ ...currentWaypoint }]}
              columns={columns} />
            <div className="flex">
              <div className="flex-1">
                <h2>Waypoint Traits</h2>
                <SortableTable
                  tableData={currentWaypoint.traits}
                  columns={['name', 'description']} />
              </div>
              <div className="flex-1">
                { waypoints && (
                  <>
                    <h2>Other waypoints in this system:</h2>
                    <SortableTable
                      tableData={waypoints.filter((waypoint) => {
                        return waypoint.symbol !== currentWaypoint.symbol
                      })}
                      columns={columns} />
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Location