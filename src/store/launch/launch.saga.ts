import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  fetchLaunchStart,
  fetchLaunchSuccess,
  fetchLaunchError,
} from "./launch.reducer";
import { getLaunchData, ResponseGenerator } from "../../requests/call-api";
import { GeneratorFunction, GeneratorCallerFunction, GeneratorRunnerFunction } from "../saga.types";

export function* fetchLaunchesData(): GeneratorFunction {
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

export function* onFetchLaunchesAsync(): GeneratorCallerFunction {
  yield takeEvery(fetchLaunchStart.type, fetchLaunchesData);
}

export function* launchSagas(): GeneratorRunnerFunction {
  yield all([call(onFetchLaunchesAsync)]);
}
