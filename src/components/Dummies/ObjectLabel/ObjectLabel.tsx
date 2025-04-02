import styles from './.module.css'
import Avatar from '../../UI/Avatar/avatar';

type ObjectLabelType = {
    label: string;
    avatar: string; // надо понять, как передавать изображения
};

export default function ObjectLabel({avatar, label}: ObjectLabelType) {
    return (<>
        <div className={styles.container}>
            <Avatar image_path={avatar}/>
            <p className={styles.label}>{label}</p>
        </div>
    </>);
}