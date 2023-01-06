import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHeader,
  removeHeader,
  clearHeaders,
  selectRequestHeaders,
} from '../reducers/requestSlice';
import { COLORS } from '../utility';
import TabControl from '../containers/TabControl';
import JsonViewer from '../lib/JsonViewer';
import ExpandableEntry from './ExpandableEntry';

const styles = {
  fieldset: {
    border: '1px solid #ddd',
    borderTopWidth: 0,
    padding: '10px 5px 5px',
    height: '100%',
  },
  legend: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: COLORS.primary,
  },
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
  },
  left: {
    flex: '0 0 40%',
    padding: '10px',
    height: '100%',
    border: '1px solid #ddd',
  },
  right: {
    flex: '0 0 60%',
    height: '100%',
    overflow: 'hidden',
    paddingBottom: '10px',
    marginLeft: '10px',
    border: '1px solid #eee',
  },
  form: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  h2: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  fieldControls: {
    padding: '10px',
    height: '100%',
    overflow: 'auto',
  },
  label: {
    display: 'block',
  },
  labelText: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    paddingBottom: '8px',
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: '15px',
  },
  controls: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  clearBtn: {
    marginLeft: '15px',
  },
  closeBtn: {
    border: '1px solid red',
  },
};

export default function RequestHeaders() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const headers = useSelector(selectRequestHeaders);
  const dispatch = useDispatch();
  const keyInput = useRef(null);

  const handleEditEntry = (key, value) => {
    setKey(key);
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key && value) {
      setKey('');
      setValue('');
      dispatch(addHeader({ key, value }));
      keyInput.current.focus();
    }
  };

  const handleClick = (evt) => {
    const { name } = evt.target;
    if (name === 'clear') {
      dispatch(clearHeaders());
    }
  };

  const handleTextChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'key') {
      setKey(value);
    } else if (name === 'value') {
      setValue(value);
    }
  };

  const handleRemoveEntry = (key) => {
    dispatch(removeHeader(key));
  };

  return (
    <div style={styles.fieldset} className="fieldset" onSubmit={handleSubmit}>
      <div style={styles.container}>
        <div style={styles.left}>
          <form style={styles.form}>
            <label style={styles.label} htmlFor="request-headers-form-key">
              <span style={styles.labelText}>Entry Key</span>
              <input
                id="request-headers-form-key"
                style={styles.input}
                type="text"
                name="key"
                value={key}
                onChange={handleTextChange}
                placeholder="Enter Key"
                ref={keyInput}
              />
            </label>
            <label style={styles.label} htmlFor="request-headers-form-value">
              <span style={styles.labelText}>Entry Value</span>
              <input
                id="request-headers-form-value"
                style={styles.input}
                type="text"
                name="value"
                value={value}
                onChange={handleTextChange}
                placeholder="Enter Value"
              />
            </label>
            <div style={styles.controls}>
              <button className="btn btn-blue" type="submit" name="enter">Enter</button>
              <button className="btn btn-red" type="button" name="clear" onClick={handleClick} style={styles.clearBtn}>
                Clear
              </button>
            </div>
          </form>
        </div>
        <div style={styles.right}>
          <TabControl
            activeHeader="Controls"
            headers={['Controls', 'Json']}
            items={[
              <div style={styles.fieldControls} key="Controls">
                {Object.keys(headers).map((k) => (
                  <ExpandableEntry
                    key={k}
                    entryKey={k}
                    value={headers[k]}
                    onRemove={handleRemoveEntry}
                    onEdit={handleEditEntry}
                  />
                ))}
              </div>,
              <JsonViewer json={headers} key="Json" />,
            ]}
            panelStyle={{ overflow: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}
