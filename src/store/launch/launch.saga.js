import { all, call, put, takeEvery } from "redux-saga/effects"
import { fetchLaunchStartType, fetchLaunchSuccess, fetchLaunchError } from "./launch.reducer";
import axios from "axios";
import { callApi, url } from "../../requests/call-api";

export function* fetchLaunchesData() {
    try{
        const response = yield call(callApi, axios, url);

        if(response.status !== 200) {
            throw new Error('Failed to fetch launches data')
        }
       
        yield put(fetchLaunchSuccess(response.data));
    }catch(error) {
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