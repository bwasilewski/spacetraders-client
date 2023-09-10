import { useState, useEffect } from 'react'
import SortableTable from '../components/SortableTable'
import Pagination from '../components/Pagination'

function Fleet() {
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [fleet, setFleet] = useState([])
  const [meta, setMeta] = useState({})
  useEffect(() => {
    fetch(`http://localhost:3000/api/fleet?page=${currentPage}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setFleet(data.data)
        setMeta(data.meta)
      })
  }, [])

  const columns = [
    'symbol', 
    'frame',
    'engine',
    'reactor',
    'crew',
    'fuel',
    'status',
    'location',
  ]

  const basicData = fleet.map((ship) => {
    const { symbol, frame, engine, reactor, crew, fuel, nav } = ship
    return {
      symbol,
      frame: frame.name,
      engine: engine.name,
      reactor: reactor.name,
      crew: crew.current,
      fuel: `${fuel.current} / ${fuel.capacity}`,
      status: nav.status,
      location: nav.waypointSymbol,
    }
  })

  return (
    <>
      <section>
        <h1>My Fleet</h1>
        { fleet.length > 0 && (
          <>
            <SortableTable tableData={basicData} columns={columns} />
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
