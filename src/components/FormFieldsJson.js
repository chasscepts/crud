import { useSelector } from 'react-redux';
import { selectFormFields } from '../reducers/formSlice';

const styles = {
  container: {
    padding: '0',
  },
};

export default function FormFieldsJson() {
  const fields = useSelector(selectFormFields);
  return (
    <div style={styles.container}>
      <pre>{JSON.stringify(fields, undefined, 1)}</pre>
    </div>
  );
}
