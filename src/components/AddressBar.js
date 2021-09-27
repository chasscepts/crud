import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsync, selectHasPendingRequests } from '../reducers/requestSlice';
import { requestMethods } from '../utility';
import LdsRing from './LdsRing';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px',
    border: '1px solid #ddd',
  },
  select: {
    outline: 'none',
    marginLeft: '4px',
    padding: '7px 0',
  },
  url: {
    flex: 1,
    outline: 'none',
    margin: '0 0 0 4px',
    padding: '7px 15px',
    height: '100%',
  },
  btn: {
    paddingLeft: '15px',
    paddingRight: '15px',
    height: '100%',
  },
  loader: {
    border: '1px solid #ddd',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    height: '100%',
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center',
    margin: '1px 0',
  },
};

const methods = Object.values(requestMethods);

function LoadingIndicator() {
  const loading = useSelector(selectHasPendingRequests);

  if (loading) {
    return (
      <div style={styles.loader}>
        <LdsRing width={20} color="#62b5e5" />
      </div>
    );
  }
  return <></>;
}

export default function AddressBar() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState(methods[0]);

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    if (!url) return;
    dispatch(fetchAsync(url, method));
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'url') {
      setUrl(value);
    } else if (name === 'method') {
      setMethod(value);
    }
  };

  return (
    <form style={styles.container} onSubmit={submit}>
      <select style={styles.select} name="method" value={method} onChange={handleChange}>
        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <input style={styles.url} type="url" placeholder="Enter url" name="url" value={url} onChange={handleChange} />
      <LoadingIndicator />
      <button style={styles.btn} className="btn btn-blue" type="submit">GO</button>
    </form>
  );
}
