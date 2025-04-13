import styles from "./.module.css";
import ProfileIcon from "../../UI/ProficeIcon/ProfileIcon";
import {Outlet, Link} from "react-router-dom";
import { useAuth } from "../../../provider/authProvider";

export default function MainLayout() {
    const token = useAuth();
    return (<>
      <header className={styles.header + " heading"}>
        <div className={styles.headerDivider}>
          <div className={styles.leftHalf}>
          <h1 className={styles.logo}>Логотип</h1>
          <nav className={styles.naviagation}>
            <ul>
              <li><Link to="/">Программы обмена</Link></li>
              <li><Link to="/universities">Университеты</Link></li>
            </ul>
          </nav>
          </div>
          <div>
            { token.token ?
              (
                <Link to="/profile"><ProfileIcon/></Link>
              ):(
                <>
                <Link to="/login">Вход</Link>
                <span>\</span>
                <Link to="/register">Регистрация</Link>
                </>
              )
            }
          </div>
        </div>
      </header>
      <div className={styles.container + " .textPrimary"}>
        <Outlet/>
      </div>
    <footer className={styles.footer}>
      <p>&copy; 2025 Все права защищены</p>
    </footer>
    </>);
}