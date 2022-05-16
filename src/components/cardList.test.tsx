import { render } from "@testing-library/react";
import CardList from "./cardList";
import CardMock from "./card";

jest.mock("./card", () => jest.fn(() => <div>card component</div>)); //mocking card component

describe("CardList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render cardList with card component", () => {
    const props: Array<any> = [
      {
        mission_name: "Fake mission 1",
        launch_date_utc: "2006-04-14T22:30:00.000Z",
        rocket: { rocket_name: "fake rocket 12" },
        launch_success: false,
        upcoming: true,
      },
      {
        mission_name: "Fake mission 2",
        launch_date_utc: "2006-03-24T22:30:00.000Z",
        rocket: { rocket_name: "fake rocket" },
        launch_success: false,
        upcoming: true,
      },
    ];
    render(<CardList launchesData={props} />);
    expect(CardMock).toHaveBeenCalled();
    expect(CardMock).toHaveBeenCalledTimes(2);
    expect((CardMock as jest.Mock).mock.calls[0][0].name).toBe("Fake mission 1");
    expect((CardMock as jest.Mock).mock.calls[0][0].date).toBe("2006-04-14");
    expect((CardMock as jest.Mock).mock.calls[0][0].rocket).toBe("fake rocket 12");
    expect((CardMock as jest.Mock).mock.calls[0][0].upcoming).toBe(true);
    expect((CardMock as jest.Mock).mock.calls[0][0].launchStatus).toBe(false);
    expect((CardMock as jest.Mock).mock.calls[1][0].rocket).toBe("fake rocket");
  });
});
