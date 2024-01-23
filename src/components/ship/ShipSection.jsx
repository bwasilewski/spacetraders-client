import PropTypes from 'prop-types'

function Crew({data, title}) {
  Crew.propTypes = {
    data: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  return (
    <div>
      <h2>{title}</h2>
      
      <table className="mb-4">
        <thead>
          <tr>
            {Object.keys(data).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(data).map((key) => (
              <td key={key}>{data[key]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Crew