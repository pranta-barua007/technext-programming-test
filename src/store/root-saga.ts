import { all, AllEffect, fork, ForkEffect } from "redux-saga/effects";

import { launchSagas } from "./launch/launch.saga";

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(launchSagas)
  ]);
}

export default rootSaga;
