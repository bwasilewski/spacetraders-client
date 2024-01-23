import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Marketplace() {
  const { symbol } = useParams()
  const splitSymbol = symbol.split('-')
  const system = `${splitSymbol[0]}-${splitSymbol[1]}`
  const [isLoading, setIsLoading] = useState(false)
  const [marketData, setMarketData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if ( !isLoading && marketData === null ) {
      setIsLoading(true)

      fetch(`http://localhost:3000/api/system/${system}/waypoint/${symbol}/market`)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false)
          console.log(data)
          if ( data.error ) {
            setError(data.error)
            return
          }
          setMarketData(data.data)
        })
        .catch((error) => {
          setIsLoading(false)
          setError(error)
          console.error(error)
        })
    }
  }, [error, isLoading, marketData, symbol, system])

  return (
    <>
      { !isLoading && !error && marketData && (
        <section>
          <h1>Marketplace</h1>

          <div className="mb-4">
            <h2>Exchange</h2>
            <p>Coming soon...</p>
          </div>
        
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <h2>Exports</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  { marketData.exports.map((exportItem) => {
                    return (
                      <tr key={exportItem.symbol}>
                        <td>{exportItem.name}</td>
                        <td>{exportItem.description}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex-1">
              <h2>Imports</h2>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  { marketData.imports.map((importItem) => {
                    return (
                      <tr key={importItem.symbol}>
                        <td>{importItem.name}</td>
                        <td>{importItem.description}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4">
            <h2>Trade Goods</h2>

            <table>
              <thead>
                <tr>
                  <th>Purchase Price</th>
                  <th>Sell Price</th>
                  <th>Supply</th>
                  <th>Symbol</th>
                  <th>Trade Volume</th>
                </tr>
              </thead>
              <tbody>
                { marketData.tradeGoods.map((tradeGood) => {
                  return (
                    <tr key={tradeGood.symbol}>
                      <td>{tradeGood.purchasePrice}</td>
                      <td>{tradeGood.sellPrice}</td>
                      <td>{tradeGood.supply}</td>
                      <td>{tradeGood.symbol}</td>
                      <td>{tradeGood.tradeVolume}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <h2>Transactions</h2>

            <table>
              <thead>
                <tr>
                  <th>Ship</th>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Trade Symbol</th>
                  <th>Units</th>
                  <th>Price/Unit</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                { marketData.transactions.map((transaction) => {
                  return (
                    <tr key={transaction.timestamp}>
                      <td>{transaction.shipSymbol}</td>
                      <td>{transaction.timestamp}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.tradeSymbol}</td>
                      <td>{transaction.units}</td>
                      <td>{transaction.pricePerUnit}</td>
                      <td>{transaction.totalPrice}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  )
}

export default Marketplace