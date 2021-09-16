import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsync } from '../reducers/requestSlice';
import { requestMethods } from '../utility';
import RequestHeader from './RequestHeader';

const styles = {
  container: {
    display: 'flex',
    padding: '7px',
    margin: '4px',
    border: '1px solid #ddd',
  },
  select: {
    outline: 'none',
    marginLeft: '4px',
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
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState(methods[0]);

  const dispatch = useDispatch();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'url') {
      setUrl(value);
    } else if (name === 'method') {
      setMethod(value);
    }
  };

  const handleSubmit = () => {
    if (!url) return;
    dispatch(fetchAsync(url, method));
  };

  return (
    <div style={styles.container}>
      <RequestHeader />
      <select style={styles.select} name="method" value={method} onChange={handleChange}>
        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <input style={styles.url} type="text" placeholder="Enter url" name="url" value={url} onChange={handleChange} />
      <button style={styles.btn} type="button" onClick={handleSubmit}>GO</button>
    </div>
  );
}
