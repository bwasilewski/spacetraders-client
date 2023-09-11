const baseURL = import.meta.env.VITE_SERVER_ROUTE

const FetchAgent = (onSuccess, onError) => {
  fetch(`${baseURL}/api/player`)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((error) => {
      console.error(error)
      onError(error)
    })
}

const FetchSystem = (system, onSuccess, onError) => {
  const route = `${baseURL}/api/system/${system}`
  fetch(route)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((error) => {
      console.error(error)
      onError(error)
    })
}

const FetchWaypoint = (waypoint, onSuccess, onError) => {
  let splitSymbol = waypoint.split('-')
  let system = `${splitSymbol[0]}-${splitSymbol[1]}`
  fetch(`${baseURL}/api/system/${system}/waypoint/${waypoint}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data: ", data)
      if (data.error) {
        console.error(data.error)
        onError(data.error)
      } else {
        onSuccess(data)
      }
    })
    .catch((error) => onError(error))
}

const FetchContracts = (onSuccess, onError) => {
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

export { 
  FetchAgent, 
  FetchContracts, 
  FetchSystem, 
  FetchWaypoint 
}