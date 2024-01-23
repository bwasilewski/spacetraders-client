import PropTypes from 'prop-types'
import FormatDate from '../../helpers/FormatDate'

function Nav({data}) {
  Nav.propTypes = {
    data: PropTypes.shape({
      flightMode: PropTypes.string.isRequired,
      route: PropTypes.object.isRequired,
      status: PropTypes.string.isRequired,
      systemSymbol: PropTypes.string.isRequired,
      waypointSymbol: PropTypes.string.isRequired,
    }).isRequired,
  }
  return (
    <div>
      <h2>Navigation System</h2>

      <table className="mb-4">
        <thead>
          <tr>
            <th>Flight Mode</th>
            <th>Status</th>
            <th>System</th>
            <th>Waypoint</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.flightMode}</td>
            <td>{data.status}</td>
            <td>{data.systemSymbol}</td>
            <td>{data.waypointSymbol}</td>
          </tr>
        </tbody>
      </table>

      <h3>Route</h3>
      <table className="mb-4">
        <thead>
          <tr>
            <th>Arrival Time</th>
            <th>Departure Waypoint</th>
            <th>Departure Time</th>
            <th>Destination Waypoint</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{FormatDate(data.route.arrival)}</td>
            <td>{data.route.departure.symbol}</td>
            <td>{FormatDate(data.route.departureTime)}</td>
            <td>{data.route.destination.symbol}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Nav