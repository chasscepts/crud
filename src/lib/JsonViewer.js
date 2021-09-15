import PropTypes from 'prop-types';
import syntaxHighlight from './syntaxHighlight';

const styles = {
  container: {
    padding: '10px',
    height: '100%',
    overflow: 'auto',
  },
};

export default function JsonViewer({ json }) {
  if (json === null) {
    return <></>;
  }

  return (
    <div style={styles.container}>
      <pre className="pre" dangerouslySetInnerHTML={{ __html: syntaxHighlight(json) }} />
    </div>
  );
}

JsonViewer.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  json: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
};

JsonViewer.defaultProps = {
  json: null,
};
