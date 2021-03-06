import Form from '../components/Form';
import TabControl from './TabControl';
import FormFieldsControls from '../components/FormFieldsControls';
import FormFieldsJson from '../components/FormFieldsJson';
import { COLORS } from '../utility';

const styles = {
  container: {
    height: '100%',
    overflow: 'hidden',
  },
  fieldset: {
    height: '100%',
    padding: '10px 0 0',
    border: `0 dotted ${COLORS.primary}`,
    borderTopWidth: '1px',
  },
  legend: {
    fontWeight: 'bold',
    fontSize: '1.4rem',
  },
  legendRider: {
    color: COLORS.primary,
    fontSize: '0.7rem',
  },
  body: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: '10px',
    position: 'relative',
    height: '100%',
  },
  left: {
    flex: '0 0 40%',
    columnSpan: '2',
    padding: '10px',
    height: '100%',
    border: '1px solid #ddd',
  },
  right: {
    flex: '0 0 60%',
    columnSpan: 3,
    height: '100%',
    overflow: 'hidden',
    paddingBottom: '10px',
    border: '1px solid #ddd',
  },
};

export default function FormPanel() {
  return (
    <div style={styles.container}>
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>
          Form
          <span style={styles.legendRider}>[Uploaded in POST/PUT requests]</span>
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
