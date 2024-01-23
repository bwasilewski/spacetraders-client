import { useEffect, useState } from 'react'
// import { connect } from 'react-redux'
// import SortableTable from '../components/SortableTable'
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

function System() {
  const { symbol } = useParams()
  const [error, setError] = useState(null)
  const [system, setSystem] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [factions, setFactions] = useState([])
  const [waypoints, setWaypoints] = useState([])

  useEffect(() => {
    if (isLoading) return

    setIsLoading(true)

    if ( system === null ) {
      fetch(`http://localhost:3000/api/system/${symbol}`)
        .then((res) => res.json())
        .then((data) => {
          if ( data.error ) {
            setIsLoading(false)
            setError(data.error)
            return
          }
          setFactions(data.data.factions)
          setWaypoints(data.data.waypoints)
          setSystem(data.data)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setError(err)
          setIsLoading(false)
        })
    }
  }, [system, symbol, isLoading])

  return (
    <section>
      <h1>System: {symbol}</h1>
      { waypoints.length > 0 && (
        <section>
          <h2>Waypoints</h2>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
            { waypoints.map((waypoint) => (
              <tr key={waypoint.symbol}>
                <td>{waypoint.symbol}</td>
                <td>{waypoint.type}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </section>
      )}
    </section>
  )
}

export default System