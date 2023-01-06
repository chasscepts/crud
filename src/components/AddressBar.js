import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAsync,
  selectHasPendingRequests,
  selectMethod,
  selectUrl,
} from '../reducers/requestSlice';
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
    margin: '0 8px',
    padding: '7px 0',
  },
  url: {
    flex: 1,
    outline: 'none',
    padding: '7px 15px',
    height: '100%',
  },
  btn: {
    width: '51px',
    textAlign: 'center',
    height: '100%',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

const GoBtn = () => {
  const loading = useSelector(selectHasPendingRequests);
  if (loading) {
    return (
      <div style={styles.btn} className="btn btn-blue">
        <LdsRing width={20} color="#fff" />
      </div>
    );
  }

  return <button style={styles.btn} className="btn btn-blue" type="submit">GO</button>;
};

export default function AddressBar() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState(methods[0]);
  const storeMethod = useSelector(selectMethod);
  const storeUrl = useSelector(selectUrl);

  const dispatch = useDispatch();

  useEffect(() => setUrl(storeUrl), [storeUrl]);
  useEffect(() => setMethod(storeMethod), [storeMethod]);

  const submit = (e) => {
    e.preventDefault();
    if (!url) return;
    dispatch(fetchAsync(url, method));
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'url') {
      setUrl(value);
    } else if (name === 'method') {
      setMethod(value);
    }
  };

  return (
    <form style={styles.container} onSubmit={submit}>
      <input style={styles.url} type="url" placeholder="Enter url" name="url" value={url} onChange={handleChange} />
      <select style={styles.select} name="method" value={method} onChange={handleChange}>
        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <GoBtn />
    </form>
  );
}
