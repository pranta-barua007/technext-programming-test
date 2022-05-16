import { render } from "@testing-library/react";
import FilterSelector, { FilterObject } from "./filterSelector";

describe("filterSelector", () => {
  test("should render text with appropiate props", () => {
    const filterByUpcomingProps: Array<FilterObject> = [
      { name: "Select Filter By Upcoming status", value: "" },
      { name: "Is Upcoming", value: true },
      { name: "Not Upcoming", value: false },
    ];
    const { getByText } = render(
      <FilterSelector
        filterOptions={filterByUpcomingProps}
        onSelectorChange={jest.fn()}
      />
    );
    expect(getByText(/Select Filter By Upcoming status/i)).toBeInTheDocument();
    expect(getByText(/Is Upcoming/i)).toBeInTheDocument();
    expect(getByText(/Not Upcoming/i)).toBeInTheDocument();
  });
});
