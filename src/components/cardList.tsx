import Card from "./card";

export type CardListProps = {
    launchesData: []
}

const CardList = ({ launchesData }: CardListProps) => {
    return (
        <div>
            {
                launchesData.map((data: any, i: any) => <Card
                    key={i}
                    name={data.mission_name}
                    date={data.launch_date_utc}
                    rocket={data.rocket.rocket_name}
                />)
            }
        </div>
    )
}

export default CardList;