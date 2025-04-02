import styles from "./.module.css"

export function InfoLabel({children}: any) {
    return (<p className={styles.label}>{children}</p>)
}

export function InfoValue({children}: any) {
    return (<p className={styles.value}>{children}</p>)
}