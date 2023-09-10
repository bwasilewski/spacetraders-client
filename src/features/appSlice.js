import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    app: {
      agent: null,
      system: null,
      waypoint: null,
      contracts: null,
    }
  },
  reducers: {
    setAgent: (state, action) => {
      state.app.agent = action.payload
    },
    setContracts: (state, action) => {
      state.app.contracts = action.payload
    },
    setSystem: (state, action) => {
      state.app.system = action.payload
    },
    setWaypoint: (state, action) => {
      state.app.waypoint = action.payload
    },
  },
})

export const { 
  setAgent, 
  setContracts, 
  setError, 
  setSystem, 
  setWaypoint 
} = appSlice.actions
export default appSlice.reducer
