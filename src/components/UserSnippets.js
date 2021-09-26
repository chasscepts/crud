import { useState } from 'react';
import { getSnippets, addSnippet, deleteSnippet } from '../services/storage';
import ExpandableEntry from './ExpandableEntry';
import { COLORS } from '../utility';

const styles = {
  fieldset: {
    border: '1px solid #ddd',
    padding: '5px',
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
  h3: {
    margin: '5px 0',
    color: COLORS.primary,
  },
  form: {
    padding: '10px',
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
      setSnippets(getSnippets());
    }
  };

  const removeSnippet = (key) => {
    deleteSnippet(key);
    setSnippets(getSnippets());
  };

  return (
    <fieldset style={styles.fieldset}>
      <legend>Saved Snippets</legend>
      <div style={styles.container}>
        <div style={styles.snippetsContainer}>
          {Object.keys(snippets).map((k) => (
            <ExpandableEntry key={k} entryKey={k} value={snippets[k]} onRemove={removeSnippet} />
          ))}
        </div>
        <h3 style={styles.h3}>New Snippet</h3>
        <form style={styles.form} onSubmit={handleFormSubmit}>
          <input style={styles.input} name="key" type="text" value={key} placeholder="Enter Key" onChange={handleTextChange} />
          <input style={styles.input} name="value" type="text" value={value} placeholder="Enter Value" onChange={handleTextChange} />
          <div style={styles.controls}>
            <button className="btn btn-blue round" type="submit">Save</button>
          </div>
        </form>
      </div>
    </fieldset>
  );
}
