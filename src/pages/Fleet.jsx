import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'

function Fleet() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10
  const [fleet, setFleet] = useState(null)
  const [meta, setMeta] = useState({})
  useEffect(() => {
    if ( fleet === null ) {
      fetch(`http://localhost:3000/api/fleet?page=${currentPage}&limit=${limit}`)
        .then((res) => res.json())
        .then((data) => {
          setFleet(data.data)
          setMeta(data.meta)
          console.log('Fleet: ', data.data)
        })
      }
  }, [fleet, currentPage, limit])

  return (
    <>
      <section>
        <h1>My Fleet</h1>
        { fleet !== null && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Frame</th>
                  <th>Engine</th>
                  <th>Reactor</th>
                  <th>Crew Count</th>
                  <th>Fuel</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>View Ship</th>
                </tr>
              </thead>
              <tbody>
                {fleet.map((ship) => (
                  <tr key={ship.symbol}>
                    <td>{ship.symbol}</td>
                    <td>{ship.frame.name}</td>
                    <td>{ship.engine.name}</td>
                    <td>{ship.reactor.name}</td>
                    <td>{ship.crew.current} / {ship.crew.capacity}</td>
                    <td>{ship.fuel.current} / {ship.fuel.capacity}</td>
                    <td>{ship.nav.status}</td>
                    <td>{ship.nav.waypointSymbol}</td>
                    <td>
                      <Link to={`/fleet/${ship.symbol}`}>View Ship</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination 
              meta={meta} 
              goBack={() => setCurrentPage(currentPage + 1)}
              goForward={() => setCurrentPage(currentPage - 1)}
            />
          </>
        )}
      </section>
    </>
  )
}

export default Fleet
