import styles from "./.module.css";
import React from "react";
import {Outlet} from "react-router";

export default function MainLayout() {
    return (<>
      <header className={styles.header}>
        <h1>Логотип</h1>
        <nav>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/about">О нас</a></li>
            <li><a href="/contact">Контакты</a></li>
          </ul>
        </nav>
      </header>

      <Outlet/>

    <footer className={styles.footer}>
      <p>&copy; 2025 Все права защищены</p>
    </footer>
    </>);
};