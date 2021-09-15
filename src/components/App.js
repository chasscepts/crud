import styles from '../assets/css/App.module.css';
import AddressBar from './AddressBar';
import FormPanel from '../containers/FormPanel';
import ResponseViewer from './ResponseViewer';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Hello CRUD</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.left}>
          <AddressBar />
          <div className={styles.formWrap}><FormPanel /></div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightInner}>
            <ResponseViewer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
