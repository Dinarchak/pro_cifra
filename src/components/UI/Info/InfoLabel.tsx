import styles from "./.module.css"

export function InfoLabel({children}: {children: React.ReactNode}) {
    return (<p className={styles.label}>{children}</p>)
}

export function InfoValue({children}: {children: React.ReactNode}) {
    return (<p className={styles.value}>{children}</p>)
}