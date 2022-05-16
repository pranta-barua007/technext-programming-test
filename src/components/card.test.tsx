import { render } from "@testing-library/react";
import Card, { CardProps } from "./card";

describe("Card", () => {
  test("should render text with appropiate props", () => {
    const { getByText } = render(
      <Card
        name={"Fake mission 2"}
        date={"2015-02-23"}
        rocket={"fake one rocket"}
        upcoming={true}
        launchStatus={false}
      />
    );
    const expectedCard = getByText(/2015-02-23/i);
    expect(expectedCard).toBeInTheDocument();
  });
});
