import styles from '../assets/css/App.module.css';
import AddressBar from './AddressBar';
import FormPanel from '../containers/FormPanel';
import ResponseViewer from './ResponseViewer';
import Drawer from '../containers/Drawer';
import logo from '../assets/images/http.png';
import TabControl from '../containers/TabControl';
import RequestHeaders from './RequestHeaders';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={logo} width={30} alt="logo" />
      </header>
      <main className={styles.main}>
        <div className={styles.left}>
          <AddressBar />
          <div className={styles.formWrap}>
            <TabControl
              activeHeader="Body"
              headers={['Body', 'Headers']}
              items={[
                <FormPanel key="body" />,
                <RequestHeaders key="headers" />,
              ]}
            />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightInner}>
            <ResponseViewer />
          </div>
        </div>
      </main>
      <Drawer />
    </div>
  );
}

export default App;
