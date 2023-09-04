import { useEffect, useState } from 'react'

function Contracts() {
  const [contracts, setContracts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/contracts')
      .then((res) => res.json())
      .then((data) => setContracts(data))
  }, [])

  return (
    <>
      {console.log('Contracts: ', contracts)}
      <section>
        <h1>Contracts</h1>
      </section>
    </>
  )
}

export default Contracts
