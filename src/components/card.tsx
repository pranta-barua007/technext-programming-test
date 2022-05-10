import { ReactElement } from "react";

export type CardProps = {
  name: string;
  date: string;
  rocket: number;
  upcoming: boolean;
  launchStatus: boolean;
};

const Card = ({ name, date, rocket, upcoming, launchStatus }: CardProps): ReactElement => {
  return (
    <div className="col s12 m6 l4">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Mission Name: {name}</span>
          <p>Date: {date}</p>
          <p>Rokcet: {rocket}</p>
          <p>Upcoming: {`${upcoming}`}</p>
          <p>Status: {`${launchStatus}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
