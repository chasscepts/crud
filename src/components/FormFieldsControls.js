import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { selectFormFields, removeFormField } from '../reducers/formSlice';
import ExpandableEntry from './ExpandableEntry';

const styles = {
  container: {
    padding: '5px 10px',
  },
};

const FormFieldsControls = ({ setKey, setValue }) => {
  const fields = useSelector(selectFormFields);
  const dispatch = useDispatch();

  const handleRemoveClick = (key) => {
    dispatch(removeFormField(key));
  };

  const handleEdit = (key, value) => {
    setKey(key);
    setValue(value);
  };

  return (
    <div style={styles.container}>
      {Object.keys(fields).map((k) => (
        <ExpandableEntry
          key={k}
          entryKey={k}
          value={fields[k]}
          onRemove={handleRemoveClick}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

FormFieldsControls.propTypes = {
  setKey: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default FormFieldsControls;
