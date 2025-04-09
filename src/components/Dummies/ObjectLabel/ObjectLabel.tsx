import styles from './.module.css'
import Avatar from '../../UI/Avatar/avatar';
import img from "../../../static/logout-svgrepo-com.svg"

type ObjectLabelType = {
    label: string;
};

export default function ObjectLabel({label}: ObjectLabelType) {
    return (<>
        <div className={styles.container}>
            <p className={styles.label}>{label}</p>
        </div>
    </>);
}