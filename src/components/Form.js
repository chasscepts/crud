import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetForm, setFormField } from '../reducers/formSlice';

const styles = {
  label: {
    display: 'block',
  },
  labelText: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    paddingBottom: '8px',
  },
  keyInput: {
    display: 'block',
    width: '100%',
  },
  valueField: {
    display: 'block',
    width: '100%',
  },
  formControls: {
    paddingTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  clearBtn: {
    marginLeft: '30px',
  },
};

export default function Form() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  let keyInput;

  const submit = (e) => {
    e.preventDefault();
    if (key && value) {
      dispatch(setFormField({ key, value }));
      setKey('');
      setValue('');
      keyInput.focus();
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    if (name === 'key') {
      setKey(value);
    } else if (name === 'value') {
      setValue(value);
    }
  };

  const handleKeyUp = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      submit({ preventDefault: () => {} });
    }
  };

  const handleResetForm = () => dispatch(resetForm());

  return (
    <form onSubmit={submit}>
      <div style={styles.label}>
        <span style={styles.labelText}>Entry Key</span>
        <input
          name="key"
          style={styles.keyInput}
          type="text"
          placeholder="Enter Key"
          onChange={handleChange}
          value={key}
          ref={(kInput) => { keyInput = kInput; }}
        />
      </div>
      <div style={{ ...styles.label, paddingTop: '20px' }}>
        <span style={styles.labelText}>Entry Value</span>
        <textarea name="value" style={styles.valueField} rows="10" placeholder="Value" onChange={handleChange} value={value} onKeyUp={handleKeyUp} />
      </div>
      <div style={styles.formControls}>
        <button className="btn btn-blue uppercase" type="submit">Add Entry</button>
        <button style={styles.clearBtn} className="btn btn-red uppercase" type="button" onClick={handleResetForm}>
          Clear Form
        </button>
      </div>
    </form>
  );
}
