import { createAction, createSlice } from '@reduxjs/toolkit'

const fetchLaunchStartType = 'launch/FETCH_LAUNCH_START';
const fetchLaunchStart = createAction(fetchLaunchStartType);
const initialState = { data: [], error: null, pending: false }

const launchSlice = createSlice({
  name: 'launch',
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
      builder
        .addCase(fetchLaunchStart, (state) => {
            state.pending = true
        })
  }
})

export const { fetchLaunchSuccess, fetchLaunchError } = launchSlice.actions
export { fetchLaunchStartType, fetchLaunchStart }
export default launchSlice.reducer