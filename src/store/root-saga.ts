import { all, fork } from "redux-saga/effects";

import { launchSagas } from "./launch/launch.saga";
import { RootSaga } from "./saga.types"


function* rootSaga(): RootSaga {
  yield all([
    fork(launchSagas)
  ]);
}

export default rootSaga;
