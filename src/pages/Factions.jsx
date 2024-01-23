import { useEffect, useState } from 'react'
import SortableTable from '../components/SortableTable'
import Pagination from '../components/Pagination'

function Factions() {
  const [currentPage, setCurrentPage] = useState(1)
  const [factions, setFactions] = useState([])
  const [meta ,setMeta] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/api/factions?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        setFactions(data.data)
        setMeta(data.meta)
      })
  }, [currentPage])

  const basicData = factions.map((faction) => {
    const { 
      symbol, 
      name, 
      description, 
      headquarters, 
      isRecruiting } = faction

    return {
      symbol,
      name,
      description,
      headquarters,
      isRecruiting,
    }
  })

  const columns = [
    'symbol', 
    'name', 
    'description', 
    'headquarters', 
    'isRecruiting'
  ]

  return (
    <>
      <section>
        <h1>Factions</h1>

        {factions.length > 0 && (
          <>
            <SortableTable 
              className="mb-4"
              tableData={basicData} 
              columns={columns} 
            />
            <Pagination
              meta={meta}
              goBack={() => setCurrentPage(currentPage - 1)}
              goForward={() => setCurrentPage(currentPage + 1)}
            />
          </>
        )}

      </section>
    </>
  )
}

export default Factions
