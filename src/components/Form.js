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
  return (
    <>
      <div style={styles.label}>
        <span style={styles.labelText}>Entry Key</span>
        <input style={styles.keyInput} type="text" placeholder="Enter Key" />
      </div>
      <div style={{ ...styles.label, paddingTop: '20px' }}>
        <span style={styles.labelText}>Entry Value</span>
        <textarea style={styles.valueField} rows="10" placeholder="Value" />
      </div>
      <div style={styles.formControls}>
        <button className="btn btn-blue uppercase" type="button">Add Entry</button>
        <button style={styles.clearBtn} className="btn btn-red uppercase" type="button">
          Clear Form
        </button>
      </div>
    </>
  );
}
