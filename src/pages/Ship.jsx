import { useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import Cargo from '../components/ship/Cargo'
import Crew from '../components/ship/Crew'
import Nav from '../components/ship/Nav'

function Ship() {
  const { symbol } = useParams()

  const [shipData, setShipData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const unDockShip = () => {
    fetch(`http://localhost:3000/api/fleet/${symbol}/undock`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Data Response: ', data)
        if ( data.error ) {
          setError(data.error)
          console.error(data.error)
          return
        }
        setShipData(data.data)
      })
      .catch((err) => {
        setError(err)
        console.error(err)
      })
  }

  useEffect(() => {
    if ( !isLoading ) {
      if ( shipData === null && error === null ) {
        setIsLoading(true)
        fetch(`http://localhost:3000/api/fleet/${symbol}`)
          .then((res) => res.json())
          .then((data) => {
            setIsLoading(false)
            console.log('Data Response: ', data)
            if ( data.error ) {
              setError(data.error)
              console.error(data.error)
              return
            }
            setShipData(data.data)
          })
          .catch((err) => {
            setIsLoading(false)
            setError(err)
            console.error(err)
          })
      }
    }
  }, [shipData, symbol, isLoading, error])

  return (
    <>
      <section>
        <h1>Welcome aboard the {symbol}!</h1>

        { shipData !== null && (
          <>
            { shipData.nav.status === 'DOCKED' && (
              <button>
                Undock Ship
              </button>
            )}
            { shipData.nav.status !== 'DOCKED' && (
              <button>
                Attempt to Dock Ship
              </button>
            )}
            <section className="ship-section">
              <Cargo data={shipData.cargo} />
            </section>
            <section className="ship-section">
              <Nav data={shipData.nav} />
            </section>
            <section className="ship-section">
              <Crew data={shipData.crew} />
            </section>
            <h2>
              <Link to="/fleet/:symbol/cargo">Engine</Link>
            </h2>
            <h2>
              <Link to="/fleet/:symbol/cargo">Frame</Link>
            </h2>
            <h2>
              <Link to="/fleet/:symbol/cargo">Fuel</Link>
            </h2>
            <h2>
              <Link to="/fleet/:symbol/cargo">Modules</Link>
            </h2>
            <h2>
              <Link to="/fleet/:symbol/cargo">Navigation</Link>
            </h2>
            <h2>
              <Link to="/fleet/:symbol/cargo">Reactor</Link>
            </h2>
            <h2>
              <Link to="/fleet/:symbol/cargo">Registration</Link>
            </h2>
          </>
        )}
      </section>
    </>
  )
}

export default Ship