interface Props {
    content: string;
}

export default function AppShowTextMultiline(props: Props) {
    return (
        <>
            {props.content.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
            })}
        </>
    )
}