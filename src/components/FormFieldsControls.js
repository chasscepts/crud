import { useSelector, useDispatch } from 'react-redux';
import { selectFormFields, removeFormField } from '../reducers/formSlice';
import EntryControl from './EntryControl';

const styles = {
  container: {
    padding: '10px 0',
  },
};

export default function FormFieldsControls() {
  const fields = useSelector(selectFormFields);
  const dispatch = useDispatch();

  const handleRemoveClick = (key) => {
    dispatch(removeFormField(key));
  };

  return (
    <div style={styles.container}>
      {Object.keys(fields).map(
        (k) => <EntryControl key={k} fieldKey={k} value={fields[k]} onRemove={handleRemoveClick} />,
      )}
    </div>
  );
}
