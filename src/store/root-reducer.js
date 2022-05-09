import { combineReducers } from "redux";
import launchReducer from "./launch/launch.reducer";

const rootReducer = combineReducers({
  launch: launchReducer,
});

export default rootReducer;
