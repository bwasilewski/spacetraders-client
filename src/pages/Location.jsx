import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SortableTable from '../components/SortableTable'
import { FetchWaypoint, FetchSystem } from '../api/App'
import { setWaypoint, setSystem } from '../features/appSlice'
import { Link } from 'react-router-dom'

function Location() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [waypoints, setWaypoints] = useState(null)
  const [hasMarket, setHasMarket] = useState(false)
  const agent = useSelector((state) => {
    return state.app.agent
  })
  const system = useSelector((state) => {
    return state.app.system
  })
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
    if ( agent !== null ) {
      console.log('System: ', system)
      if ( system === null ) {
        const { headquarters } = agent
        const splitSymbol = headquarters.split('-')
        FetchSystem(
          `${splitSymbol[0]}-${splitSymbol[1]}`,
          (data) => {
            if (data.data) {
              dispatch(setSystem(data.data))
            }
            if (data.error) {
              // setError(data.error)
              console.error(data.error)
            }
          },
          (error) => {
            console.error(error)
            // setError(error)
          }
        )
      }
      if ( currentWaypoint === null ) {
        FetchWaypoint(
          agent.headquarters,
          (data) => {
            if (data.data) {
              console.log('Waypoint:', data.data)
              dispatch(setWaypoint(data.data))
            }
            if(data.error) {
              // setError(data.error)
              console.error(data.error)
            }
          },
          (error) => {
            console.error(error)
            // setError(error)
          }
        )
      }
      if ( currentWaypoint !== null ) {
        setHasMarket(currentWaypoint.traits.find((trait) => {
          return trait.name === 'Marketplace'
        }))
        let { systemSymbol } = currentWaypoint
        fetch(`http://localhost:3000/api/system/${systemSymbol}/waypoints`)
          .then((response) => response.json())
          .then((data) => {
            if ( data.error ) {
              console.log(data.error)
            } else {
              console.log('Waypoints:', data.data)
              setWaypoints(data.data)
            }
            setIsLoading(false)
          })
          .catch((error) => {
            console.log(error)
            setIsLoading(false)
          })
      }
    }

    if ( agent !== null && currentWaypoint !== null ) {
      setIsLoading(false)
    }
  }, [agent, dispatch, currentWaypoint, isLoading, system])

  return (
    <>
      {!isLoading && (
        <section>
          {console.log('Loading:', isLoading)}
          { isLoading === false && (
          <>
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
          </>
        )}
        </section>
      )}
      {isLoading && (
        <section>
          <h1>Loading...</h1>
        </section>
      )}
    </>
  )
}

export default Location