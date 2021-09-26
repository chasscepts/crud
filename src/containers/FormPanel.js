import Form from '../components/Form';
import TabControl from './TabControl';
import FormFieldsControls from '../components/FormFieldsControls';
import FormFieldsJson from '../components/FormFieldsJson';

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
          <span style={styles.legendRider}>[form data is NOT sent in get and delete requests]</span>
        </legend>
        <div style={styles.body}>
          <div style={styles.left}>
            <Form />
          </div>
          <div style={styles.right}>
            <TabControl
              activeHeader="Controls"
              headers={['Controls', 'JSON']}
              items={[
                <FormFieldsControls key="controls" />,
                <FormFieldsJson key="json" />,
              ]}
              panelStyle={{ overflow: 'auto', borderTop: '1px solid #62b5e5' }}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
