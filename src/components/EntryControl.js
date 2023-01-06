import { useState } from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../assets/images/delete.png';

const styles = {
  container: {
    marginBottom: '8px',
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
  fieldButton: (color) => ({
    width: '22px',
    height: '22px',
    color,
    border: '1px solid #eee',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    cursor: 'pointer',
  }),
  btn: {
    width: '22px',
    height: '22px',
    border: '1px solid #eee',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  img: {
    width: '22px',
    height: '22px',
  },
  valueText: {
    padding: '0 5px 5px 35px',
    wordBreak: 'break-all',
  },
};

function FieldButton({ char, color, onClick }) {
  return (
    <button style={styles.fieldButton(color)} type="button" onClick={onClick}>
      <span>{char}</span>
    </button>
  );
}

FieldButton.propTypes = {
  char: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

FieldButton.defaultProps = {
  color: '#67899c',
  onClick: null,
};

export default function EntryControl({ fieldKey, value, onRemove }) {
  const [expanded, setExpanded] = useState(false);

  const handleRemoveClick = () => {
    onRemove(fieldKey);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let val = value;
  const type = typeof value;
  if (type === 'boolean') {
    val = value ? 'True' : 'False';
  } else if (type === 'object') {
    if (!value) {
      val = 'Null';
    } else if (value instanceof Array) {
      val = '[Array]';
    } else {
      val = '[Object]';
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.keyRow}>
        <FieldButton char={expanded ? '-' : '+'} onClick={handleExpandClick} />
        <div style={styles.keyText}>{fieldKey}</div>
        <button type="button" style={styles.btn} onClick={handleRemoveClick}>
          <img src={deleteIcon} alt="delete" style={styles.img} />
        </button>
      </div>
      {expanded && <div style={styles.valueText}>{val}</div>}
    </div>
  );
}

EntryControl.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  // eslint-disable-next-line
  value: PropTypes.any,
  onRemove: PropTypes.func.isRequired,
};

EntryControl.defaultProps = {
  value: null,
};
