import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHeader,
  removeHeader,
  clearHeaders,
  selectRequestHeaders,
} from '../reducers/requestSlice';
import EntryControl from './EntryControl';
import { COLORS } from '../utility';

const styles = {
  fieldset: {
    border: '1px solid #ddd',
    padding: '5px',
  },
  legend: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: COLORS.primary,
  },
  container: {
    padding: '10px 10px 0',
  },
  h2: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  fieldControls: {
    border: '1px solid #ddd',
    padding: '10px',
    minHeight: '40px',
    maxHeight: '120px',
    overflow: 'auto',
  },
  input: {
    display: 'block',
    width: '100%',
    marginTop: '15px',
  },
  controls: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  clearBtn: {
    margin: '0 10px',
  },
  closeBtn: {
    border: '1px solid red',
  },
};

export default function RequestHeader() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const headers = useSelector(selectRequestHeaders);
  const dispatch = useDispatch();

  let keyInput;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key && value) {
      setKey('');
      setValue('');
      dispatch(addHeader({ key, value }));
      keyInput.focus();
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
    <fieldset style={styles.fieldset} onSubmit={handleSubmit}>
      <legend style={styles.legend}>Headers</legend>
      <form style={styles.container}>
        <div style={styles.fieldControls}>
          {Object.keys(headers).map((k) => (
            <EntryControl key={k} fieldKey={k} value={headers[k]} onRemove={handleRemoveEntry} />
          ))}
        </div>
        <input
          style={styles.input}
          type="text"
          name="key"
          value={key}
          onChange={handleTextChange}
          placeholder="Enter Key"
          ref={(el) => { keyInput = el; }}
        />
        <input style={styles.input} type="text" name="value" value={value} onChange={handleTextChange} placeholder="Enter Value" />
        <div style={styles.controls}>
          <button className="btn btn-blue sm" type="submit" name="enter">Enter</button>
          <button className="btn btn-red sm" type="button" name="clear" onClick={handleClick} style={styles.clearBtn}>
            Clear
          </button>
          <button style={styles.closeBtn} className="btn sm" type="button" name="close" onClick={handleClick}>
            Close
          </button>
        </div>
      </form>
    </fieldset>
  );
}
