import React from "react";
import tmdb from './tmdb.svg';

import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer id="footer" className={styles.footer}>
            <p>
                Made with ❤ by
                <a
                    href="https://github.com/seyon123"
                    target="_blank"
                    rel="noopener noreferrer"
                > Seyon Rajagopal </a>
                <br/>
                Powered by: <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"><img height="14"src={tmdb} alt="The Movie DB (TMDB)"></img></a>

            </p>
        </footer>
    );
};

export default Footer;
