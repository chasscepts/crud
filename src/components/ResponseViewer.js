import { useSelector } from 'react-redux';
import TabControl from '../containers/TabControl';
import JsonViewer from '../lib/JsonViewer';
import { selectRequestError, selectResponseBody, selectResponseHeader } from '../reducers/requestSlice';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: (error) => ({
    padding: '10px',
    backgroundColor: error ? '#d42020' : '#62b5e5',
  }),
  h2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: '1.6rem',
  },
  tabWrap: {
    flex: 1,
    overflow: 'hidden',
  },
};

export default function ResponseViewer() {
  const header = useSelector(selectResponseHeader);
  const body = useSelector(selectResponseBody);
  const error = useSelector(selectRequestError);

  return (
    <div style={styles.container}>
      <div style={styles.header(error)}>
        <h2 style={styles.h2}>Response</h2>
      </div>
      <div style={styles.tabWrap}>
        <TabControl
          activeHeader="Body"
          headers={['Header', 'Body', 'Error']}
          items={[
            <JsonViewer key="Header" json={header} />,
            <JsonViewer key="Body" json={body} />,
            <JsonViewer key="Error" json={error} />,
          ]}
          panelStyle={{ overflow: 'auto', borderTop: '1px solid #62b5e5' }}
        />
      </div>
    </div>
  );
}
