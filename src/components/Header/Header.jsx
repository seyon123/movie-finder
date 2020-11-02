import React from "react";

import styles from "./Header.module.css";

const Footer = () => {
    return (
        <div className={styles.navbar}>
            <h1 className={styles.logo}>
                Movie Search
            </h1>
            <div id="modeToggle" className={styles.modeToggle}><i className="far fa-moon"></i></div>
        </div>
    );
};

export default Footer;
