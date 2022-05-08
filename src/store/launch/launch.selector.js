import { createSelector } from "reselect";

const selectLaunch = state => state.launch;

export const selectLaunchData = createSelector(
    [selectLaunch],
    launch => launch.data
);

export const selectLaunchPending = createSelector(
    [selectLaunch],
    launch => launch.pending
);

export const selectLaunchError = createSelector(
    [selectLaunch],
    launch => launch.error
);

export const selectLaunchDataFilteredByDate = createSelector(
    [selectLaunchData],
    (launchData, dateParam) => launchData.filter((data) => {
        const targetDate = new Date(data.launch_date_utc);
        const convertedDate = targetDate.toISOString().split('T')[0];
        return convertedDate === dateParam
    })
);
