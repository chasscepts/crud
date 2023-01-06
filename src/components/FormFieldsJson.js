import { useSelector } from 'react-redux';
import JsonViewer from '../lib/JsonViewer';
import { selectFormFields } from '../reducers/formSlice';

const styles = {
  container: {
    padding: '10px 0 0',
  },
};

export default function FormFieldsJson() {
  const fields = useSelector(selectFormFields);
  return (
    <div style={styles.container}>
      <JsonViewer json={fields} />
    </div>
  );
}
