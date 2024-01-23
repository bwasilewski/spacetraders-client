import PropTypes from 'prop-types'
import FormatDate from '../../helpers/FormatDate'

function Cargo({data}) {
  Cargo.propTypes = {
    data: PropTypes.shape({
      capacity: PropTypes.number.isRequired,
      inventory: PropTypes.arrayOf(PropTypes.object).isRequired,
      units: PropTypes.number.isRequired,
    }).isRequired,
  }
  return (
    <div>
      <h1>Cargo</h1>

      <table className="mb-4">
        <thead>
          <tr>
            <th>Capacity</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.capacity}</td>
            <td>{data.units}</td>
          </tr>
        </tbody>
      </table>

      <p>Inventory coming soon...</p>
    </div>
  )
}

export default Cargo