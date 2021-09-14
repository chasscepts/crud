import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeFormField } from '../reducers/formSlice';

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
  valueText: {
    padding: '0 5px 5px 35px',
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
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeFormField(fieldKey));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={styles.container}>
      <div style={styles.keyRow}>
        <FieldButton char={expanded ? '-' : '+'} onClick={handleExpandClick} />
        <div style={styles.keyText}>{fieldKey}</div>
        <FieldButton char="X" color="red" onClick={handleRemoveClick} />
      </div>
      {expanded && <div style={styles.valueText}>{value}</div>}
    </div>
  );
}

FormFieldControl.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
