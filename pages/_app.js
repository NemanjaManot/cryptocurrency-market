import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import CopyrightIcon from '@material-ui/icons/Copyright';

function MyApp({ Component, pageProps }) {
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
