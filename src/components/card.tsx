export type CardProps = {
  name: string;
  date: string;
  rocket: number;
  upcoming: boolean;
  launchStatus: boolean;
};

const Card = ({ name, date, rocket, upcoming, launchStatus }: CardProps) => {
  return (
    <div style={{ margin: '4px', border: '4px solid gray' }}>
      <p>Name: {name}</p>
      <p>Date: {date}</p>
      <p>Rokcet: {rocket}</p>
      <p>Upcoming: {`${upcoming}`}</p>
      <p>Status: {`${launchStatus}`}</p>
    </div>
  );
};

export default Card;
