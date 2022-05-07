import { all, call } from "redux-saga/effects";

import { launchSagas } from "./launch/launch.saga";

function* rootSaga() {
  yield all([
    call(launchSagas)
  ]);
}

export default rootSaga;
