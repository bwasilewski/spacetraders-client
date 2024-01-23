import { useEffect } from 'react'
import FormatDate from '../helpers/FormatDate'
import { FetchContracts } from '../api/App'
import { useDispatch, useSelector } from 'react-redux'
import { setContracts } from '../features/appSlice'
import { Link } from 'react-router-dom'

function Contracts() {
  const dispatch = useDispatch()
  const contracts = useSelector((state) => {
    return state.app.contracts
  })

  useEffect(() => {
    if ( contracts === null ) {
      FetchContracts(
        (data) => {
          if (data.data) {
            console.log('Contracts:', data.data)
            dispatch(setContracts(data.data))
          }
          if(data.error) {
            console.error(data.error)
          }
        },
        (error) => {
          console.error(error)
        }
      )
    }
  }, [])

  return (
    <>
      <section>
        <h1>Contracts</h1>

        {contracts !== null && contracts.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Faction</th>
                <th>Deadline</th>
                <th>Expiration</th>
                <th>Accept By</th>
                <th>Status</th>
                <th>Fulfilled</th>
                <th>Type</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map(({accepted, id, factionSymbol, fulfilled, expiration, deadlineToAccept, terms, type}) => (
                <tr key={id}>
                  <td>{factionSymbol}</td>
                  <td>{FormatDate(terms.deadline)}</td>
                  <td>{FormatDate(expiration)}</td>
                  <td>{FormatDate(deadlineToAccept)}</td>
                  <td>
                    {accepted && 'Accepted'}
                    {!accepted && 'Pending'}
                  </td>
                  <td>
                    {fulfilled && 'Fulfilled'}
                    {!fulfilled && 'Not Fulfilled'}
                  </td>
                  <td>{type}</td>
                  <td>
                    <Link to={`/contracts/${id}`}>View Contract</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <p>No contracts found</p>
            {/* <button onClick={requestNewContract}>Request a new contract</button> */}
          </>
        )}
      </section>
    </>
  )
}

export default Contracts
