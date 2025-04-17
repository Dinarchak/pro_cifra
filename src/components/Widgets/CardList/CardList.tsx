import styles from "./.module.css";

type CardListType<
  T extends { id: number },
  ExtraProps = any
> = {
  list: Array<T>;
  Card: React.ComponentType<{ obj: T } & ExtraProps>;
  cardProps?: ExtraProps
};
export default function CardList<T extends {id: number}, ExtraProps>({list, Card, cardProps}: CardListType<T, ExtraProps>) {
    const coursesList = list.map(obj => <>
        <li key={obj.id} className={styles.courseCard}>
            <Card {...({ obj, ...cardProps } as { obj: T } & ExtraProps)}/>
        </li>
    </>)

    return (<>
        {coursesList.length === 0 ?
        <p style={{fontSize: "var(--text-2xl)", textAlign: 'center', color: 'var(--color-muted)'}}>Здесь пока ничего нет.</p> :

        <ul className={styles.list}>
            {coursesList}
        </ul>}
    </>);
}