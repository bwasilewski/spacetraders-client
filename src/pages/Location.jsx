import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SortableTable from '../components/SortableTable'

function Location() {
  const [waypoints, setWaypoints] = useState(null)
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
        <h1>Current Waypoint: {currentWaypoint.symbol}</h1>
        <h2>System Information</h2>
          <>
            { currentWaypoint && (
              <>
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
      </section>
    </>
  )
}

export default Location