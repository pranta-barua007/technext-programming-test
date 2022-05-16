import { render } from "@testing-library/react";
import FilterContainer from "./filterContainer";
import FilterSelectorMock from "./filterSelector";
import { useSelector } from "react-redux";
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
    let state: any;
    beforeEach(() => {
        jest.clearAllMocks();
        state = {
            launch: {
                data: [],
                error: null,
                pending: false,
            }
        }
    });

    const filterByDateMock: Array<any> = [
        { name: "Select Filter By Date", value: "" },
        { name: "Last week", value: "2022-05-09" },
        { name: "Last month", value: "2022- 04" },
        { name: "Last year", value: "2021" },
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
