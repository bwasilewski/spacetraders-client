import PropTypes from 'prop-types'

function Pagination({ meta, goBack, goForward }) {
  Pagination.propTypes = {
    meta: PropTypes.shape({
      total: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      limit: PropTypes.number.isRequired,
    }).isRequired,
    goBack: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
  }

  const { total, page, limit } = meta

  return (
    <nav>
      <ul className="flex">
        <li>
          {page > 1 && (
            <button onClick={goBack}>Previous</button>
          )}
        </li>
        <li>
          {( page < total/limit ) && (
            <button onClick={goForward}>Next</button>
          )}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination