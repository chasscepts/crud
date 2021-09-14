import TabControl from '../containers/TabControl';
import FormFieldsControls from './FormFieldsControls';
import FormFieldsJson from './FormFieldsJson';

const styles = {
  container: {
    height: '100%',
  },
  fieldset: {
    height: '100%',
    border: '1px solid #ddd',
  },
  legend: {
    fontWeight: 'bold',
    fontSize: '1.4rem',
  },
  legendRider: {
    color: 'red',
    fontSize: '0.7rem',
  },
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
  body: {
    display: 'flex',
    position: 'relative',
    height: '100%',
  },
  left: {
    flex: '0 0 40%',
    padding: '10px',
    height: '100%',
  },
  right: {
    flex: '0 0 60%',
    padding: '0 10px 10px 10px',
    borderLeft: '1px solid #ddd',
    height: '100%',
  },
};

export default function FormPanel() {
  return (
    <div style={styles.container}>
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>
          Form
          <span style={styles.legendRider}>[Content is sent in post and put requests]</span>
        </legend>
        <div style={styles.body}>
          <div style={styles.left}>
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
          </div>
          <div style={styles.right}>
            <TabControl
              activeHeader="Controls"
              headers={['Controls', 'JSON']}
              items={[
                <FormFieldsControls key="controls" />,
                <FormFieldsJson key="json" />,
              ]}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
