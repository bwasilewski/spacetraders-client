import { useEffect, useState } from 'react'

function Contracts() {
  const [contracts, setContracts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/contracts/list')
      .then((res) => res.json())
      .then((data) => {
        console.log('Data: ', data)
        setContracts(data.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const requestNewContract = () => {
    fetch('http://localhost:3000/api/contracts/negotiate?shipSymbol=ABCD', {
      method: 'POST',
      body: JSON.stringify({
        name: 'New Contract',
        description: 'This is a new contract',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setContracts(data)
      })
  }

  return (
    <>
      <section>
        <h1>Contracts</h1>

        {contracts.length > 0 ? (
          <ul>
            {console.log('Contracts: ', contracts)}
            {contracts.map(({accepted, id, factionSymbol, expiration, deadlineToAccept, terms, type}) => (
              <li key={id}>
                <h2>ID: {id}</h2>
                <p>Faction: {factionSymbol}</p>
                <p>Deadline: {terms.deadline}</p>
                { !accepted && (
                  <>
                    <p>Expiration: {expiration}</p>
                    <p>Accept By: {deadlineToAccept}</p>
                  </> 
                )}
                <p>Type: {type}</p>
                <div>
                  <h3>Terms</h3>
                  <pre>{JSON.stringify(terms, null, 2)}</pre>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>No contracts found</p>
            <button onClick={requestNewContract}>Request a new contract</button>
          </>
        )}
      </section>
    </>
  )
}

export default Contracts
