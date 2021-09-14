import styles from '../assets/css/App.module.css';
import AddressBar from './AddressBar';
import Form from './Form';
import ResponsePanel from './ResponsePanel';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Hello CRUD</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.left}>
          <AddressBar />
          <div className={styles.formWrap}><Form /></div>
        </div>
        <div className={styles.right}>
          <ResponsePanel />
        </div>
      </main>
    </div>
  );
}

export default App;
