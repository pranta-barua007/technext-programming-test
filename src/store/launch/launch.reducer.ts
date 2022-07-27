import { createSlice } from "@reduxjs/toolkit";

interface LaunchInitialState {
  data: any,
  error: String | null,
  pending: Boolean
}

const initialState: LaunchInitialState = {
  data: [],
  error: null,
  pending: false,
};

const launchSlice = createSlice({
  name: "launch",
  initialState,
  reducers: {
    fetchLaunchStart(state) {
      return {
        ...state,
        pending: true,
      };
    },
    fetchLaunchSuccess(state, action) {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    fetchLaunchError(state, action) {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    },
  },
});

export const { fetchLaunchStart, fetchLaunchSuccess, fetchLaunchError } =
  launchSlice.actions;

export default launchSlice.reducer;
