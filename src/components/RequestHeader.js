import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHeader, clearHeaders, selectRequestHeaders } from '../reducers/requestSlice';
import FormFieldControl from './FormFieldControl';

const styles = {
  space: {
    position: 'relative',
    width: '280px',
  },
  container: {
    position: 'absolute',
    width: '100%',
    border: '1px solid #ddd',
    padding: '10px',
    zIndex: '5',
    backgroundColor: '#fff',
    boxShadow: '0 0 1px 1px #999',
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
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const headers = useSelector(selectRequestHeaders);
  const dispatch = useDispatch();

  const handleClick = (evt) => {
    const { name } = evt.target;
    if (name === 'open') {
      setOpen(true);
    } else if (name === 'close') {
      setOpen(false);
    } else if (name === 'enter') {
      if (key && value) {
        dispatch(addHeader({ key, value }));
      }
    } else if (name === 'clear') {
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

  if (!open) {
    return <button className="btn btn-blue" type="button" name="open" onClick={handleClick}>Headers</button>;
  }

  return (
    <div style={styles.space}>
      <div style={styles.container}>
        <h2 style={styles.h2}>Headers</h2>
        <div style={styles.fieldControls}>
          {Object.keys(headers).map(
            (k) => <FormFieldControl key={k} fieldKey={k} value={headers[k]} />,
          )}
        </div>
        <input style={styles.input} type="text" name="key" value={key} onChange={handleTextChange} placeholder="Enter Key" />
        <input style={styles.input} type="text" name="value" value={value} onChange={handleTextChange} placeholder="Enter Value" />
        <div style={styles.controls}>
          <button className="btn btn-blue sm" type="button" name="enter" onClick={handleClick}>Enter</button>
          <button className="btn btn-red sm" type="button" name="clear" onClick={handleClick} style={styles.clearBtn}>
            Clear
          </button>
          <button style={styles.closeBtn} className="btn sm" type="button" name="close" onClick={handleClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
