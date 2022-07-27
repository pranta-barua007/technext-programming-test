import { createSelector } from "reselect";

import { RootState } from "../store";

const selectLaunch = (state: RootState) => state.launch;

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
