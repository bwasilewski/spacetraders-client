import PropTypes from 'prop-types'

function ErrorComponent({error}) {
  ErrorComponent.propTypes = {
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string.isRequired,
      data: PropTypes.object,
    }).isRequired,
  }

  return (
    <>
      <p>Code: {error.code}</p>
      <p>Message: {error.message}</p>
      <div>
        <p>Data:</p>
        <pre>{JSON.stringify(error.data, null, 2)}</pre>
      </div>
    </>
  )
}

export default ErrorComponent