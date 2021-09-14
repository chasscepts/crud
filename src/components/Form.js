const styles = {
  container: {
    height: '100%',
  },
  fieldset: {
    height: '100%',
    border: '1px solid #ddd',
  },
  legendRider: {
    color: 'red',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
};

export default function Form() {
  return (
    <div style={styles.container}>
      <fieldset style={styles.fieldset}>
        <legend>
          Form
          <span>[Content is sent in post and put requests]</span>
        </legend>
        <div>
          <div>
            <div>
              <input type="text" placeholder="Enter Key" />
              <textarea placeholder="Value" />
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
