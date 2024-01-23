import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import FormatDate from '../helpers/FormatDate'

function Contract() {
  const { id } = useParams()

  const [contractData, setContractData] = useState(null)
  const [terms, setTerms] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if ( contractData === null ) {
      fetch(`http://localhost:3000/api/contract/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if ( data.error ) {
            console.error(data.error)
            setError(data.error)
            return
          }
          setContractData(data.data)
          setTerms(data.data.terms)
        })
        .catch((err) => {
          console.error(err)
          setError(err)
        })
    }
  }, [])


  return (
    <>
      <section>
        <h1>Contract: {id}</h1>
        { contractData !== null && (
          <>
            <table className="mb-4">
              <thead>
                <tr>
                  <th>Faction</th>
                  <th>Accepted</th>
                  <th>Deadline to accept</th>
                  <th>Expiration</th>
                  <th>Fulfilled</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{contractData.factionSymbol}</td>
                  <td>{contractData.accepted.toString()}</td>
                  <td>{FormatDate(contractData.deadlineToAccept)}</td>
                  <td>{FormatDate(contractData.expiration)}</td>
                  <td>{contractData.fulfilled.toString()}</td>
                  <td>{contractData.type}</td>
                </tr>
              </tbody>
            </table>

            <h2>Terms</h2>
            <table>
              <thead>
                <tr>
                  <th>Deadline</th>
                  <th>Delivery</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{FormatDate(terms.deadline)}</td>
                  <td>
                    {terms.deliver.map(({tradeSymbol, destinationSymbol, unitsFulfilled, unitsRequired}) => (
                      <p key={tradeSymbol}>
                        {tradeSymbol} to {destinationSymbol} ({unitsFulfilled}/{unitsRequired})
                      </p>
                    ))}
                  </td>
                  <td>{terms.payment.onAccepted} on accepted, { terms.payment.onFulfilled} on fulfillment</td>
                </tr>
              </tbody>
            </table>
            { console.log(contractData) }
          </>
        )}
      </section>
    </>
  )
}

export default Contract