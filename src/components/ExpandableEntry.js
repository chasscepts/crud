import { useState } from 'react';
import PropTypes from 'prop-types';
import copyIcon from '../assets/images/copy.png';
import deleteIcon from '../assets/images/delete.png';
import editIcon from '../assets/images/pencil.png';
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
    wordBreak: 'break-all',
  },
};

export default function ExpandableEntry({
  entryKey,
  value,
  onRemove,
  onEdit,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleEditClick = () => onEdit(entryKey, value);

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
        <button style={styles.btn} type="button" onClick={copyValue} title="Copy Value">
          <img style={styles.icon} alt="copy" src={copyIcon} />
        </button>
        {onEdit ? (
          <button style={styles.btn} type="button" onClick={handleEditClick} title="Edit Entry">
            <img style={styles.icon} alt="edit" src={editIcon} />
          </button>
        ) : null}
        {onRemove ? (
          <button style={styles.btn} type="button" onClick={onRemove} title="Delete Entry">
            <img style={styles.icon} alt="delete" src={deleteIcon} />
          </button>
        ) : null}
      </div>
      {expanded ? <div style={styles.valueText}>{value}</div> : null}
    </div>
  );
}

ExpandableEntry.propTypes = {
  entryKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
};

ExpandableEntry.defaultProps = {
  onRemove: null,
  onEdit: null,
};
