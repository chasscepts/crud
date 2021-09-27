import { useState } from 'react';
import { getSnippets, addSnippet, deleteSnippet } from '../services/storage';
import { COLORS } from '../utility';
import ExpandableEntry from './ExpandableEntry';

const styles = {
  fieldset: {
    border: '1px solid #ddd',
    padding: '5px',
    margin: '15px 0 0',
  },
  legend: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    color: COLORS.primary,
  },
  container: {
    padding: '10px 10px 0',
  },
  snippetsContainer: {
    width: '100%',
    maxHeigth: '300px',
    overflowY: 'auto',
    padding: '3px',
    border: '1px solid #ddd',
  },
  input: {
    width: '100%',
    margin: '5px 0',
  },
  controls: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
};

export default function UserSnippets() {
  const [snippets, setSnippets] = useState(getSnippets());
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  let keyInput;

  const handleTextChange = ({ target: { name, value } }) => {
    if (name === 'key') {
      setKey(value);
    } else if (name === 'value') {
      setValue(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (key && value) {
      addSnippet(key, value);
      setKey('');
      setValue('');
      setSnippets({ ...getSnippets() });
      keyInput.focus();
    }
  };

  const removeSnippet = (key) => {
    deleteSnippet(key);
    setSnippets({ ...getSnippets() });
  };

  return (
    <fieldset style={styles.fieldset}>
      <legend style={styles.legend}>Saved Snippets</legend>
      <div style={styles.container}>
        <div style={styles.snippetsContainer}>
          {Object.keys(snippets).map((k) => (
            <ExpandableEntry key={k} entryKey={k} value={snippets[k]} onRemove={removeSnippet} />
          ))}
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            style={styles.input}
            name="key"
            type="text"
            value={key}
            placeholder="Enter Key"
            onChange={handleTextChange}
            ref={(input) => { keyInput = input; }}
          />
          <input style={styles.input} name="value" type="text" value={value} placeholder="Enter Value" onChange={handleTextChange} />
          <div style={styles.controls}>
            <button className="btn btn-blue sm" type="submit">Save</button>
          </div>
        </form>
      </div>
    </fieldset>
  );
}
