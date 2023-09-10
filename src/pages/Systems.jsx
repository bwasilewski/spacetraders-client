import { useState, useEffect } from 'react'
import SortableTable from '../components/SortableTable'

function Systems() {
  const [systems, setFleet] = useState([])
  const [meta, setMeta] = useState({})
  useEffect(() => {
    fetch('http://localhost:3000/api/systems')
      .then((res) => res.json())
      .then((data) => {
        setFleet(data.data)
        setMeta(data.meta)
      })
  }, [])

  const columns = [
    // 'factions',
    'sectorSymbol',
    'symbol',
    'type',
    'x',
    'y',
  ]

  const basicData = systems.map((system) => {
    const { factions, sectorSymbol, symbol, type, x, y } = system
    return {
      // factions,
      sectorSymbol,
      symbol,
      type,
      x,
      y,
    }
  })

  return (
    <>
      <section>
        <h1>Systems</h1>
        <SortableTable tableData={basicData} columns={columns} />
      </section>
    </>
  )
}

export default Systems
