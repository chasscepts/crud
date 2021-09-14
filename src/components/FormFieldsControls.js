import { useSelector } from 'react-redux';
import { selectFormFields } from '../reducers/formSlice';
import FormFieldControl from './FormFieldControl';

const styles = {
  container: {
    paddingTop: '10px',
  },
};

export default function FormFieldsControls() {
  const fields = useSelector(selectFormFields);
  return (
    <div style={styles.container}>
      {Object.keys(fields).map(
        (k) => <FormFieldControl key={k} fieldKey={k} value={fields[k]} />,
      )}
    </div>
  );
}
