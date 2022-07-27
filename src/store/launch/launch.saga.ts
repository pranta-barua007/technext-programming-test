import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  fetchLaunchStart,
  fetchLaunchSuccess,
  fetchLaunchError,
} from "./launch.reducer";
import { getLaunchData, ResponseGenerator } from "../../requests/call-api";

export function* fetchLaunchesData() {
  try {
    const response: ResponseGenerator = yield call(getLaunchData);

    if (response.status !== 200) {
      throw new Error("Failed to fetch launches data");
    }

    yield put(fetchLaunchSuccess(response.data));
  } catch (error: any) {
    yield put(fetchLaunchError(error.message));
  }
}

export function* onFetchLaunchesAsync() {
  yield takeEvery(fetchLaunchStart.type, fetchLaunchesData);
}

export function* launchSagas() {
  yield all([call(onFetchLaunchesAsync)]);
}
