import styles from "./.module.css";
import ProfileIcon from "../../UI/ProficeIcon/ProfileIcon";
import {Outlet, Link} from "react-router-dom";
import { useAuth } from "../../../provider/authProvider";
import logo from "../../../static/logo.jpg";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

type CustomToggleProps = {
  children?: React.ReactNode;
};

export default function MainLayout() {
    const token = useAuth();

    return (<>
      <header className={styles.header}>
        <div className={styles.headerDivider}>
          <div className={styles.leftHalf}>
          <div className={styles.logo}><img src={logo}/></div>
          <nav className={styles.naviagation}>
            <ul>
              <li><Link to="/">Программы обмена</Link></li>
              <li><Link to="/universities">Университеты</Link></li>
            </ul>
          </nav>
          </div>
          <div className={styles.rightHalf}>
            { token.token ?
              (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-custom-1">
                      <ProfileIcon/>
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='/profile'>
                      <span className={styles.dropdownText}>Профиль</span>
                  </Dropdown.Item>
                  <Dropdown.Item>
                      <span className={styles.dropdownText} onClick={() => token.setToken(null)}>Выход</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
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