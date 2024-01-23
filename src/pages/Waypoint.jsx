import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Waypoint() {
  const { symbol } = useParams()
  const [waypoint, setWaypoint] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const splitSymbol = symbol.split('-')
  const system = `${splitSymbol[0]}-${splitSymbol[1]}`

  useEffect(() => {
    console.log('System: ', system)
    console.log('Waypoint: ', symbol)
    if ( !isLoading ) {
      if ( waypoint === null ) {
        setIsLoading(true)
        fetch(`http://localhost:3000/api/system/${system}/waypoint/${symbol}`)
          .then((res) => res.json())
          .then((data) => {
            console.log('Response data: ', data)
            setIsLoading(false)
            if ( data.error ) {
              setError(data.error)
              console.error(data.error)
              return
            }
            setWaypoint(data.data)
          })
          .catch((err) => {
            setError(err)
            setIsLoading(false)
            console.error(err)
          })
      }
    }
  }, [error, isLoading, symbol, waypoint, system])

  return (
    <section>
      <h1>Waypoint: {symbol}</h1>

      { waypoint !== null && (
        <>
          <h2>Traits</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              { waypoint.traits.map((trait) => {
                return (
                  <tr key={trait.name}>
                    <td>{trait.name}</td>
                    <td>{trait.description}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Link to="">
            <button>Travel to this waypoint</button>
          </Link>
        </>
      )}
    </section>
  )
}

export default Waypoint