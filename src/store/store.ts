import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

//Using redux saga to manage side effects(api calls etc.)
//why choose saga over thunk ref --> https://www.eternussolutions.com/2020/12/21/redux-thunk-redux-saga/
const sagaMiddleware = createSagaMiddleware();

const additionalMiddleware: Array<any> = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
  additionalMiddleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).prepend(additionalMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export { store };
