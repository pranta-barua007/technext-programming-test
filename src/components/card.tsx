export type CardProps = {
    name: string,
    date: string,
    rocket: number
}

const Card = ({ name, date, rocket }: CardProps) => {
    return (
        <div style={{margin: "4px", border: "4px solid gray"}}>
            <p>{name}</p>
            <p>{date}</p>
            <p>{rocket}</p>
        </div>
    )
}

export default Card;