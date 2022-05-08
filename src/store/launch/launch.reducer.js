import { createSlice } from '@reduxjs/toolkit'

const initialState = { data: [], error: null, pending: false }

const launchSlice = createSlice({
  name: 'launch',
  initialState,
  reducers: {
    fetchLaunchStart(state){
        return {
            ...state,
            pending: true
        }
    },
    fetchLaunchSuccess(state, action) {
        return {
            ...state,
            pending: false,
            data: action.payload
        }
    },
    fetchLaunchError(state, action) {
        return {
            ...state,
            pending: false,
            error: action.payload
        }
    },
  },
})

export const { fetchLaunchStart, fetchLaunchSuccess, fetchLaunchError } = launchSlice.actions;

export default launchSlice.reducer