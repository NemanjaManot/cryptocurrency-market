import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';

export default function Alerts() {
  return (
    <div>
      <Head>
        <title>Crypto Currency Market / Alerts</title>
      </Head>

      <main className={styles.main}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
        <p>alerts screen</p>
      </main>
    </div>
  );
}
