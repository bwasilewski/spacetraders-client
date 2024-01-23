const baseURL = import.meta.env.VITE_SERVER_ROUTE

const FetchAgent = (onSuccess, onError) => {
  console.log('Fetching agent...')
  fetch(`${baseURL}/api/player`)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((error) => {
      console.error(error)
      onError(error)
    })
}

const FetchSystem = (system, onSuccess, onError) => {
  console.log('Fetching system...')
  const route = `${baseURL}/api/system/${system}`
  fetch(route)
    .then((response) => response.json())
    .then((data) => {
      if ( data.error ) {
        console.error(data.error)
        onError(data.error)
      } else {
        onSuccess(data)
      }
    })
    .catch((error) => {
      console.error(error)
      onError(error)
    })
}

const FetchWaypoint = (waypoint, onSuccess, onError) => {
  console.log('Fetching waypoint...')
  let splitSymbol = waypoint.split('-')
  let system = `${splitSymbol[0]}-${splitSymbol[1]}`
  fetch(`${baseURL}/api/system/${system}/waypoint/${waypoint}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error(data.error)
        onError(data.error)
      } else {
        onSuccess(data.data)
      }
    })
    .catch((error) => onError(error))
}

const FetchContracts = (onSuccess, onError) => {
  console.log('Fetching contracts...')
  fetch(`${baseURL}/api/contracts/list`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error(data.error)
        onError(data.error)
      } else {
        onSuccess(data)
      }
    })
    .catch((error) => {
      console.error(error)
      onError(error)
    })
}

const FetchMarketplace = (waypoint, onSuccess, onError) => {
  console.log('Fetching marketplace...')
  const splitSymbol = waypoint.split('-')
  const system = `${splitSymbol[0]}-${splitSymbol[1]}`
  fetch(`${baseURL}/api/system/${system}/waypoint/${waypoint}/market`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        onError(data.error)
      } else {
        onSuccess(data)
      }
    })
    .catch((error) => {
      onError(error)
    })
}

export { 
  FetchAgent, 
  FetchContracts, 
  FetchMarketplace,
  FetchSystem, 
  FetchWaypoint 
}