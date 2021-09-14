import { requestMethods } from "../utility"

const styles = {
  container: {
    display: 'flex',
    padding: '10px 15px',
    margin: '2px',
    border: '1px solid #ddd',
  },
  select: {
    outline: 'none',
  },
  url: {
    flex: 1,
    outline: 'none',
  },
  btn: {
    border: 'none',
    outline: 'none',
    color: '#fff',
    backgroundColor: '#62b5e5',
  },
}

const methods = Object.values(requestMethods);

export default function Address() {
  <div style={styles.container}>
    <select style={styles.select}>
      {methods.map((m) => <option key={m} value={m}>{m}</option>)}
    </select>
    <input style={styles.url} placeholder="Enter url" />
    <button style={styles.btn} type="button">GO</button>
  </div>
}
