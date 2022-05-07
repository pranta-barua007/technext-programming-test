import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const additionalMiddleware = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
    additionalMiddleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).prepend(additionalMiddleware)
  ,
});

sagaMiddleware.run(rootSaga);

export { store }
