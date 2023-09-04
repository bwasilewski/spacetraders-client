import { useEffect, useState } from 'react'

function Factions() {
  const [factions, setFactions] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/factions')
      .then((res) => res.json())
      .then((data) => setFactions(data.data))
  }, [])

  return (
    <>
      {console.log('Factions: ', factions)}
      <section>
        <h1>Factions</h1>

        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Description</th>
              <th>Headquarters</th>
              <th>Traits</th>
              <th>Recruiting</th>
            </tr>
          </thead>
          <tbody>
            {factions.map((faction) => (
              <tr key={faction.symbol}>
                {console.log(faction.traits)}
                <td>{faction.symbol}</td>
                <td>{faction.name}</td>
                <td>{faction.description}</td>
                <td>{faction.headquarters}</td>
                <td>
                  {faction.traits.map((trait) => (
                    <span key={trait.symbol}>{trait.name} </span>
                  ))}
                </td>
                <td>
                  {faction.recruiting === true ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Factions
