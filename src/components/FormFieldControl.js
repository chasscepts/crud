import { useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
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
  }),
  valueText: {
    padding: '8px 5px 0 25px',
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

export default function FormFieldControl({ fieldKey, value }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div style={styles.keyRow}>
        <FieldButton char={expanded ? '-' : '+'} onClick={handleExpandClick} />
        <div style={styles.keyText}>{fieldKey}</div>
        <FieldButton char="X" color="red" />
      </div>
      {expanded && <div style={styles.valueText}>{value}</div>}
    </div>
  );
}

FormFieldControl.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
