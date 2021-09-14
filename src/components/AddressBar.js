import { requestMethods } from '../utility';

const styles = {
  container: {
    display: 'flex',
    padding: '7px',
    margin: '4px',
    border: '1px solid #ddd',
  },
  select: {
    outline: 'none',
  },
  url: {
    flex: 1,
    outline: 'none',
    margin: '0 4px',
    padding: '7px 15px',
  },
  btn: {
    border: 'none',
    outline: 'none',
    color: '#fff',
    backgroundColor: '#62b5e5',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
};

const methods = Object.values(requestMethods);

export default function AddressBar() {
  return (
    <div style={styles.container}>
      <select style={styles.select}>
        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <input style={styles.url} placeholder="Enter url" />
      <button style={styles.btn} type="button">GO</button>
    </div>
  );
}
