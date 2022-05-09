import { createSelector } from "reselect";

const selectLaunch = (state) => state.launch;

export const selectLaunchData = createSelector(
  [selectLaunch],
  (launch) => launch.data
);

export const selectLaunchPending = createSelector(
  [selectLaunch],
  (launch) => launch.pending
);

export const selectLaunchError = createSelector(
  [selectLaunch],
  (launch) => launch.error
);
