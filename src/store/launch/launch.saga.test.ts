/* @ts-ignore */
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

import { fetchLaunchesData } from "./launch.saga";
import {
  fetchLaunchSuccess,
  fetchLaunchStart,
  fetchLaunchError,
} from "./launch.reducer";
import { getLaunchData } from "../../requests/call-api";


//doc --> http://redux-saga-test-plan.jeremyfairbank.com/integration-testing/mocking/static-providers.html

describe("launchSga", () => {
  it("fetches the spaceX data", () => {
    const fakeData = [
      {
        mission_Name: "fakemission",
        rockets: 1,
      },
      {
        mission_Name: "fakemission2",
        rockets: 4,
      },
    ];

    const callApiData = { status: 200, data: fakeData };

    return expectSaga(fetchLaunchesData)
      .provide([
        //mocking the callApi with return value
        [matchers.call.fn(getLaunchData), callApiData],
      ])
      .put(fetchLaunchSuccess(fakeData))
      .dispatch(fetchLaunchStart())
      .run();
  });

  it("throws error on status of 400", () => {
    //using testSga more advanced control over the flow
    const fakeData: any = [];
    const callApiData = { status: 400, data: fakeData };
    const err_msg = "Failed to fetch launches data";

    const saga = testSaga(fetchLaunchesData);

    saga
      .next()
      .call(getLaunchData) //mocking the callApi
      .next(callApiData) //setting the return value
      .put(fetchLaunchError(err_msg))
      .next()
      .isDone();
  });

  it("handles the error", () => {
    const error = new Error("error fetching data");

    return expectSaga(fetchLaunchesData)
      .provide([[matchers.call.fn(getLaunchData), throwError(error)]])
      .put(fetchLaunchError(error.message))
      .dispatch(fetchLaunchStart())
      .run();
  });
});
