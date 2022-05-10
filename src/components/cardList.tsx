import { ReactElement } from "react";
import Card from "./card";

export type CardListProps = {
  launchesData: Array<any>;
};

const CardList = ({ launchesData }: CardListProps): ReactElement => {
  return (
    <div className="row">
      {launchesData.map((data: any, i: any) => {
        const convertedDate: string = new Date(data.launch_date_utc)
          .toISOString()
          .split("T")[0];
        return (
          <Card
            key={i}
            name={data.mission_name}
            date={convertedDate}
            rocket={data.rocket.rocket_name}
            upcoming={data.upcoming}
            launchStatus={data.launch_success}
          />
        );
      })}
    </div>
  );
};

export default CardList;
