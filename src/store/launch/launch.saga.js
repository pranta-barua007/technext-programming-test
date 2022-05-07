import { all, call, put, takeEvery } from "redux-saga/effects"
import { fetchLaunchStartType, fetchLaunchSuccess, fetchLaunchError } from "./launch.reducer";

export function* fetchLaunchesData() {
    try{
        const response = yield fetch('https://api.spacexdata.com/v3/launches');
        if(response.status !== 200) {
            throw new Error('Failed to fetch launches data')
        }
        const data = yield response.json();
        console.log({ data })
        yield put(fetchLaunchSuccess(data))
    }catch(error) {
        console.error(error);
        yield put(fetchLaunchError(error.message));
    }
}

export function* onFetchLaunchesAsync() {
    yield takeEvery(fetchLaunchStartType, fetchLaunchesData);
}

export function* launchSagas() {
    yield all([
        call(onFetchLaunchesAsync)
    ])
}