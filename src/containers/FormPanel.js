import { useState } from 'react';
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
    border: '1px solid #ddd',
    borderTopWidth: 0,
    padding: '10px 5px 5px',
    height: '100%',
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
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  return (
    <div style={styles.container}>
      <div style={styles.fieldset}>
        <div style={styles.body}>
          <div style={styles.left}>
            <Form entryKey={key} value={value} setKey={setKey} setValue={setValue} />
          </div>
          <div style={styles.right}>
            <TabControl
              activeHeader="Controls"
              headers={['Controls', 'JSON']}
              items={[
                <FormFieldsControls key="controls" setKey={setKey} setValue={setValue} />,
                <FormFieldsJson key="json" />,
              ]}
              panelStyle={{ overflow: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
