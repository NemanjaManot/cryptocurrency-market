import React, { useEffect } from 'react';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import CopyrightIcon from '@material-ui/icons/Copyright';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div className={styles.container}>
      <Component {...pageProps} />
      <footer className={styles.footer}>
        <a href="https://www.linkedin.com/in/nemanjamanot/" target="_blank" rel="noopener noreferrer">
          <CopyrightIcon />
          Nemanja Manot @2020
        </a>
      </footer>
    </div>
  );
}

export default MyApp;
