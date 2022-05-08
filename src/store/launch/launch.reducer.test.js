import launchReducer, {
  fetchLaunchStart,
  fetchLaunchSuccess,
  fetchLaunchError,
} from "./launch.reducer";

describe("launchReducer", () => {
    const initialState = { data: [], error: null, pending: false };

    it("should return the initial state", () => {
      expect(launchReducer(undefined, {})).toEqual(initialState);
    });

    it('should set pending to true', () => {
        const newState = { ...initialState, pending: true };
        expect(launchReducer(initialState, fetchLaunchStart())).toEqual(newState);
    })

    it('should add new data and set pending false', () => {
        const newData = [{
            "mission_Name": "fakemission",
            "rockets": 1
        }, {
            "mission_Name": "fakemission2",
            "rockets": 4
        }];
        const newState = { ...initialState, pending: false, data: newData };
        expect(launchReducer(initialState, fetchLaunchSuccess(newData))).toEqual(newState);
    })

    it('should set error message and pending false', () => {
        const errorMessage = 'Failed to fetch';
        const newState = { ...initialState, pending: false, error: errorMessage };
        expect(launchReducer(initialState, fetchLaunchError(errorMessage))).toEqual(newState);
    })
})


