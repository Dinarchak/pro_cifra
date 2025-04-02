import styles from "./.module.css";
import React from "react";
import {Outlet, Link} from "react-router";

export default function MainLayout() {
    return (<>
      <header className={styles.header}>
        <h1 className={styles.logo}>Логотип</h1>
        <nav className={styles.naviagation}>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/profile">Профиль</Link></li>
          </ul>
        </nav>
      </header>
      <div className={styles.container}>
        <Outlet/>
      </div>
    <footer className={styles.footer}>
      <p>&copy; 2025 Все права защищены</p>
    </footer>
    </>);
};