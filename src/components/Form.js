import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetForm, setFormField } from '../reducers/formSlice';
import { COLORS } from '../utility';

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
  select: {
    display: 'block',
    width: '100%',
    padding: '7px',
    color: COLORS.gray,
  },
  formControls: {
    paddingTop: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  clearBtn: {
    marginLeft: '30px',
  },
  error: {
    color: COLORS.red,
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textAlign: 'center',
    padding: '5px',
  },
};

const dataTypes = ['string', 'number', 'boolean', 'array', 'object', 'text', 'others'];

export default function Form() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState(dataTypes[0]);
  const [valueError, setValueError] = useState('');

  const dispatch = useDispatch();

  let keyInput;

  const submit = (e) => {
    e.preventDefault();
    if (!key) return;
    let val = value;
    if (type === 'number') {
      val = parseFloat(value);
      if (Number.isNaN(val)) {
        setValueError(`${value} is not a valid number`);
        return;
      }
    } else if (type === 'boolean') {
      val = value !== 'false';
    } else if (type === 'others') {
      if (val === 'null') {
        val = null;
      }
    } else if (type === 'array') {
      try {
        val = JSON.parse(val);
      } catch {
        //  We return below even if parse was successful but val is not an array;
      }
      if (!(val instanceof Array)) {
        setValueError('The provided value is not an Array');
        return;
      }
    } else if (type === 'object') {
      try {
        val = JSON.parse(val);
      } catch {
        setValueError('The provided value is not a POJO');
        return;
      }
    }
    dispatch(setFormField({ key, value: val }));
    setKey('');
    setValue('');
    setValueError('');
    keyInput.focus();
  };

  const handleChange = (evt) => {
    const { name, value: val } = evt.target;
    if (name === 'key') {
      setKey(val);
    } else if (name === 'value') {
      setValue(val);
    } else if (name === 'type') {
      setType(val);
      if (val === 'boolean') {
        setValue(!!value);
      } else if (val === 'others') {
        setValue('null');
      }
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
      <div style={{ ...styles.label, padding: '20px 0' }}>
        <span style={styles.labelText}>Choose Data Type</span>
        <select style={styles.select} name="type" value={type} onChange={handleChange}>
          {dataTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
      <div style={styles.label}>
        <span style={styles.labelText}>Entry Value</span>
        {valueError && <div style={styles.error}>{valueError}</div>}
        {type === 'string' && (
        <input
          style={styles.keyInput}
          name="value"
          type="text"
          value={value}
          onChange={handleChange}
        />
        )}
        {type === 'number' && (
        <input
          style={styles.keyInput}
          name="value"
          type="number"
          value={value}
          onChange={handleChange}
        />
        )}
        {(type === 'text' || type === 'array' || type === 'object') && (
        <textarea
          name="value"
          style={styles.valueField}
          rows="10"
          placeholder="Value"
          onChange={handleChange}
          value={value}
          onKeyUp={handleKeyUp}
        />
        )}
        {type === 'boolean' && (
        <select style={styles.select} name="value" value={value} onChange={handleChange}>
          <option>True</option>
          <option value={false}>False</option>
        </select>
        )}
        {type === 'others' && (
        <select style={styles.select} name="value" value={value} onChange={handleChange}>
          <option value="null">Null</option>
        </select>
        )}
      </div>
      <div style={styles.formControls}>
        <button className="btn btn-blue sm" type="submit">Add Entry</button>
        <button style={styles.clearBtn} className="btn btn-red sm" type="button" onClick={handleResetForm}>
          Clear Form
        </button>
      </div>
    </form>
  );
}
