import PropTypes from 'prop-types'

function Crew({data}) {
  Crew.propTypes = {
    data: PropTypes.shape({
      capacity: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
      morale: PropTypes.number.isRequired,
      required: PropTypes.number.isRequired,
      rotation: PropTypes.string.isRequired,
      wages: PropTypes.number.isRequired,
    }).isRequired,
  }

  return (
    <div>
      <h2>Crew</h2>
      
      <table className="mb-4">
        <thead>
          <tr>
            <th>Capacity</th>
            <th>Current</th>
            <th>Morale</th>
            <th>Required</th>
            <th>Rotation</th>
            <th>Wages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.capacity}</td>
            <td>{data.current}</td>
            <td>{data.morale}</td>
            <td>{data.required}</td>
            <td>{data.rotation}</td>
            <td>{data.wages}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Crew