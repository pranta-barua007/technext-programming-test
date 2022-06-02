import { render } from "@testing-library/react";
import FilterContainer from "./filterContainer";
import FilterSelectorMock from "./filterSelector";
import { useSelector } from "react-redux";
import { getPreviousDate } from "../utils/date.util";
import * as React from "react";

jest.mock("./filterSelector", () =>
    jest.fn(() => <div>filterSelector component</div>)
);

jest.mock("react-redux", () => (
    {
        useSelector: jest.fn()
    }
));

describe("filterContainer", () => {
    const useSelectorMock = useSelector as jest.Mock;
    let state : any;
    let lastWeek : any;
    let lastMonth : any;
    let lastYear : any;
    beforeEach(() => {
        jest.clearAllMocks();
        state = {
            launch: {
                data: [],
                error: null,
                pending: false,
            }
        };
    });
    
    lastWeek = getPreviousDate(7);
    lastMonth = getPreviousDate(30);
    lastMonth = lastMonth.split("-");
    lastMonth = `${lastMonth[0]}-${lastMonth[1]}`;
    lastYear = getPreviousDate(365);
    lastYear = lastYear.split("-");
    lastYear = `${lastYear[0]}`;

    const filterByDateMock: Array<any> = [
        { name: "Select Filter By Date", value: "" },
        { name: "Last week", value: lastWeek },
        { name: "Last month", value: lastMonth },
        { name: "Last year", value: lastYear },
    ];

    const filterByLaunchStatusMock: Array<any> = [
        { name: "Select Filter By Launch status", value: "" },
        { name: "Success", value: true },
        { name: "Failure", value: false },
    ];

    const filterByUpcomingMock: Array<any> = [
        { name: "Select Filter By Upcoming status", value: "" },
        { name: "Is Upcoming", value: true },
        { name: "Not Upcoming", value: false },
    ];

    test("should render filterContainer with filterSelector Component", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback(state))
        render(<FilterContainer setLaunches={jest.fn()} />);
        expect(FilterSelectorMock).toHaveBeenCalled();
        expect(FilterSelectorMock).toHaveBeenCalledTimes(3);
    });

    test("should render filterSelector with filterByDate", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback(state))
        render(<FilterContainer setLaunches={jest.fn()} />);
        expect(FilterSelectorMock).toHaveBeenCalled();
        expect((FilterSelectorMock as jest.Mock).mock.calls[0][0].filterOptions).toEqual(filterByDateMock);
        expect((FilterSelectorMock as jest.Mock).mock.calls[0][0].onSelectorChange).toBeDefined();
    })

    test("should render filterSelector with filterByLaunchStatus", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback(state))
        render(<FilterContainer setLaunches={jest.fn()} />);
        expect(FilterSelectorMock).toHaveBeenCalled();
        expect((FilterSelectorMock as jest.Mock).mock.calls[1][0].filterOptions).toEqual(filterByLaunchStatusMock);
        expect((FilterSelectorMock as jest.Mock).mock.calls[1][0].onSelectorChange).toBeDefined();
    })

    test("should render filterSelector with filterByUpcoming", () => {
        useSelectorMock.mockImplementationOnce((callback) => callback(state))
        render(<FilterContainer setLaunches={jest.fn()} />);
        expect(FilterSelectorMock).toHaveBeenCalled();
        expect((FilterSelectorMock as jest.Mock).mock.calls[2][0].filterOptions).toEqual(filterByUpcomingMock);
        expect((FilterSelectorMock as jest.Mock).mock.calls[2][0].onSelectorChange).toBeDefined();
    })
});
