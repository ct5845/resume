import './List.scss';

function List(props: {
    header: JSX.Element,
    items: JSX.Element[],
    hideBullets?: boolean,
    twoColumns?: boolean
}) {
    const mainClass = props.hideBullets ? 'List hideBullets' : 'List';

    return (
        <section className={mainClass}>
            {props.header}
            <ul className={`List_ul${props.twoColumns ? ' twoColumns': ''}`}>
                {props.items}
            </ul>
        </section>
    );
}

export default List;
