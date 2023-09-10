import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Marketplace() {
  const [market, setMarket] = useState(null)
  const currentWaypoint = useSelector((state) => {
    return state.app.waypoint
  })

  useEffect(() => {
    if ( currentWaypoint !== null && market === null ) {
      fetch(`http://localhost:3000/api/system/${currentWaypoint.systemSymbol}/waypoint/${currentWaypoint.symbol}/market`, {
      })
        .then((response) => response.json())
        .then((data) => {
          if ( data.error ) {
            console.log(data.error)
          } else {
            console.log('Market: ', data.data)
            setMarket(data.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [currentWaypoint, market])
  return (
    <>
      <section>
        <h1>Marketplace</h1>
        { market && (
          <>
            {/* {console.log(market)} */}
          </>
        )}
      </section>
    </>
  )
}

export default Marketplace