import { useEffect } from 'react'
import dayjs from 'dayjs'
import { FetchContracts } from '../api/App'
import { useDispatch, useSelector } from 'react-redux'
import { setContracts } from '../features/appSlice'

function Contracts() {
  const dispatch = useDispatch()
  const contracts = useSelector((state) => {
    return state.app.contracts
  })

  const formatDate = (date) => {
    return dayjs(date).format('MM/DD/YYYY HH:mm:ss')
  }

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
              </tr>
            </thead>
            <tbody>
              {contracts.map(({accepted, id, factionSymbol, fulfilled, expiration, deadlineToAccept, terms, type}) => (
                <tr key={id}>
                  <td>{factionSymbol}</td>
                  <td>{formatDate(terms.deadline)}</td>
                  <td>{formatDate(expiration)}</td>
                  <td>{formatDate(deadlineToAccept)}</td>
                  <td>
                    {accepted && 'Accepted'}
                    {!accepted && 'Pending'}
                  </td>
                  <td>
                    {fulfilled && 'Fulfilled'}
                    {!fulfilled && 'Not Fulfilled'}
                  </td>
                  <td>{type}</td>
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
