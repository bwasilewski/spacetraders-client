import { useState, useEffect } from 'react'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'
import { 
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'

function Systems() {
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [systems, setSystems] = useState(null)
  const [meta, setMeta] = useState({})

  ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

  const currentLimit = 20
  useEffect(() => {
    if ( !isLoading ) {
      if ( systems === null && error === null ) {
        setIsLoading(true)
        fetch(`http://localhost:3000/api/systems?page=${currentPage}&limit=${currentLimit}`)
          .then((res) => res.json())
          .then((data) => {
            setIsLoading(false)
            if ( data.error ) {
              setError(data.error)
              return
            }
            setSystems(data.data)
            console.log(data)
            setMeta(data.meta)
          })
          .catch((err) => {
            setIsLoading(false)
            setError(err)
            console.error(err)
          })
      }
    }
  }, [currentPage, currentLimit, isLoading, error, systems])

  return (
    <>
      <section>
        <h1>Systems</h1>
        { isLoading === false && systems !== null && (
          <>
            <Scatter
              options={{
                scales: {
                  y: {
                    beginAtZero: false,
                  },
                  x: {
                    beginAtZero: false,
                  }
                }
              }}
              data={
                {
                  datasets: [
                    {
                      label: 'Systems',
                      data: systems.map((system) => {
                        return {
                          x: system.x,
                          y: system.y,
                        }
                      }),
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                    }
                  ]
                }
              } />

            <table className="mb-4">
              <thead>
                <tr>
                  <th>View</th>
                  <th>Sector</th>
                  <th>System</th>
                  <th>Type</th>
                  <th>Coordinates</th>
                  <th>Waypoints</th>
                  <th>Factions</th>
                </tr>
              </thead>
              <tbody>
                {systems.map((system) => {
                  return (
                    <tr key={system.symbol}>
                      <td>
                        <Link to={`/systems/${system.symbol}`}>
                          View System
                        </Link>
                      </td>
                      <td>{system.sectorSymbol}</td>
                      <td>{system.symbol}</td>
                      <td>{system.type}</td>
                      <td>{system.x}, {system.y}</td>
                      <td>
                        <Link to="">View Waypoints</Link>
                      </td>
                      <td>
                        { system.factions.length > 0 ? (
                          <Link to="">View Factions</Link> 
                        ) : (
                          <>None</>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            { meta.total && (
              <Pagination 
                meta={meta} 
                goForward={() => setCurrentPage(currentPage + 1)}
                goBack={() => setCurrentPage(currentPage - 1)}
              />
            )}
          </>
        )}
      </section>
    </>
  )
}

export default Systems
