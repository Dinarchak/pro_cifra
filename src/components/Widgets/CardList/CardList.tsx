import styles from "./.module.css";

type CardListType<T extends {id: number}> = {
    list: Array<T>,
    Card: React.ComponentType<{obj: T}>;
}

export default function CardList<T extends {id: number}>({list, Card}: CardListType<T>) {
    const coursesList = list.map(obj => <>
        <li key={obj.id} className={styles.courseCard}>
            <Card obj={obj}/>
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