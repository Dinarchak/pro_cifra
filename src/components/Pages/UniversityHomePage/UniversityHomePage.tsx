import ObjectLabel from "../../Dummies/ObjectLabel/ObjectLabel";
import { useParams } from "react-router";
import styles from "./.module.css";
import CourseCardList from "../../Widgets/CourseCardList/CourseCardList";
import Avatar from "../../UI/Avatar/avatar";

export default function UniversityHomePage() {
    const {id} = {id : Number(useParams())};

    return(<>
        <div className={styles.subHeader}>
            <div className={styles.coverImage}>
                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pixelstalk.net%2Fwp-content%2Fuploads%2F2016%2F03%2FSunset-wallpaper-desktop.jpg&f=1&nofb=1&ipt=8bf9c6cec789588f255e1b66174450713a52e2f1cdfc3cc94da334e4dc2b4727"/>
            </div>
            <div className={styles.UniversityTitle}>
                <div className={styles.UniversityAvatar}>
                <Avatar size={6} image_path="https://patykids.ru/wp-content/uploads/260-estetichnyh-avatarok-tolko-samye-krasivye-00522bb.jpg"/>
                </div>
                <p className={styles.UniversityName}>ИТМО</p>
            </div>
            {/*возможно удалю компонент для тайтла объекта*/}
        </div>

        <div className={styles.lists}>
            <div>
                {/* фильтры */}
            </div>
            {/* <CourseCardList list={[]}/> */}
            <div>
                {/* менторы */}
            </div>
        </div>
    </>);
}