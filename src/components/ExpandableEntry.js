import { useState } from 'react';
import PropTypes from 'prop-types';
import copyIcon from '../assets/images/copy.png';
import deleteIcon from '../assets/images/delete.png';
import { copyToClipboard } from '../utility';

const styles = {
  container: {
    margin: '4px 0',
    border: '1px dotted #ddd',
  },
  keyRow: {
    display: 'flex',
    alignItems: 'center',
  },
  keyText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: '0.8rem',
    margin: '0 5px',
  },
  btn: {
    width: '22px',
    height: '22px',
    color: '#67899c',
    border: '1px solid #eee',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    cursor: 'pointer',
    padding: '2px',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  valueText: {
    padding: '0 5px 5px 35px',
    width: '100%',
    maxHeight: '150px',
    overflow: 'auto',
  },
};

export default function ExpandableEntry({ entryKey, value, onRemove }) {
  const [expanded, setExpanded] = useState(false);

  const handleRemoveClick = () => {
    if (onRemove) {
      onRemove(entryKey);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const copyValue = () => {
    copyToClipboard(value);
  };

  return (
    <div style={styles.container} className="last-clear-margin-bottom">
      <div style={styles.keyRow}>
        <button style={styles.btn} type="button" onClick={handleExpandClick}>
          <span>{expanded ? '-' : '+'}</span>
        </button>
        <div style={styles.keyText}>{entryKey}</div>
        <button style={styles.btn} type="button" onClick={copyValue} title="Copy">
          <img style={styles.icon} alt="copy" src={copyIcon} />
        </button>
        <button style={styles.btn} type="button" onClick={handleRemoveClick} title="Delete">
          <img style={styles.icon} alt="delete" src={deleteIcon} />
        </button>
      </div>
      {expanded && <div style={styles.valueText}>{value}</div>}
    </div>
  );
}

ExpandableEntry.propTypes = {
  entryKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

ExpandableEntry.defaultProps = {
  onRemove: null,
};
