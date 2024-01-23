import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Home({agent, contracts}) {
  Home.propTypes = {
    agent: PropTypes.object.isRequired,
    contracts: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  const [activeContractCount, setActiveContractCount] = useState(0)

  useEffect(() => {
    if (contracts !== null ) {
      let count = 0
      for (let i = 0; i < contracts.length; i++) {
        if (contracts[i].accepted && !contracts[i].fulfilled) {
          count++
        }
      }
      setActiveContractCount(count)
    }
  }, [agent, contracts])

  return (
    <>
      <section>
        { agent !== null && (
          <h1>Welcome, {agent.symbol}!</h1>
        )}
        { activeContractCount > 0 && (
          <p>
            You currently have <Link to="/contracts">{activeContractCount} active contract(s)</Link>.
          </p>
        )}
        { activeContractCount === 0 && (
          <p>You have no active contracts.</p>
        )}
      </section>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    agent: state.app.agent,
    contracts: state.app.contracts
  }
}

export default connect(mapStateToProps)(Home)