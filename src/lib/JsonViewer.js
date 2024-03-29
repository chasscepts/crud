import PropTypes from 'prop-types';
import { useState } from 'react';
import triangle from '../assets/images/arrow.png';
import { hash } from '../utility';
/* eslint-disable react/forbid-prop-types */

const colors = {
  string: { color: 'green' },
  number: { color: 'darkorange' },
  boolean: { color: 'blue' },
  function: { color: 'magenta' },
  null: { color: 'magenta' },
  key: { color: 'red' },
};

const styles = {
  container: {
    padding: '10px',
    height: '100%',
    overflow: 'auto',
  },
  keyRow: (depth) => ({
    position: 'relative',
    display: 'flex',
    width: '100%',
    overflowX: 'hidden',
    alignItems: 'flex-start',
    paddingLeft: `${10 + (depth * 16)}px`,
    paddingRight: '8px',
  }),
  close: (depth) => ({
    paddingLeft: `${10 + (depth * 16)}px`,
  }),
  btn: {
    position: 'absolute',
    left: '8px',
    top: '7px',
    padding: 0,
    display: 'block',
    width: '8px',
    height: '8px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  icon: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  sep: {
    paddingRight: '8px',
  },
  collapsedContent: {
    padding: '0 2px',
  },
  value: {
    flex: 1,
    wordBreak: 'break-all',
  },
};

function JsonRow({
  property, value, depth, root,
}) {
  const [expanded, setExpanded] = useState(true);

  const lType = typeof value;
  if (lType !== 'object') {
    let val = value;
    if (lType === 'function') {
      val = '[Func]';
    } else if (lType === 'string') {
      val = `"${val}"`;
    } else if (lType === 'boolean') {
      val = val ? 'true' : 'false';
    }
    return (
      <div style={styles.keyRow(depth + 1)}>
        {property && (
        <>
          <span style={colors.key}>{property}</span>
          <span style={styles.sep}>:</span>
        </>
        )}
        <span style={{ ...styles.value, ...colors[lType] }}>{`${val},`}</span>
      </div>
    );
  }

  if (!value) {
    if (property) {
      return (
        <div style={styles.keyRow(depth + 1)}>
          {property && <span style={colors.key}>{property}</span>}
          <span style={styles.sep}>:</span>
          <span style={colors.null}>Null</span>
          <span style={colors.null}>,</span>
        </div>
      );
    }
    return <div style={{ ...colors.null, padding: '15px' }}>Null</div>;
  }

  const toggleExpand = () => setExpanded(!expanded);

  const isArray = value instanceof Array;

  const bracket = isArray ? { open: '[', close: ']' } : { open: '{', close: '}' };

  const btnStyle = expanded ? { ...styles.btn, transform: 'rotate(90deg)' } : styles.btn;

  return (
    <>
      <div style={styles.keyRow(depth + 1)}>
        <button style={btnStyle} type="button" onClick={toggleExpand}>
          <img style={styles.icon} src={triangle} alt="arrow" />
        </button>
        {property && (
          <>
            <span style={colors.key}>{property}</span>
            <span style={styles.sep}>:</span>
          </>
        )}
        <span>{bracket.open}</span>
        {!expanded && (
          <>
            <span style={styles.collapsedContent}>&#x21D4;</span>
            <span>{bracket.close}</span>
            {!root && <span>,</span>}
          </>
        )}
      </div>
      { expanded && (
      <div>
        {isArray && value.map((val) => (
          <JsonRow key={`${hash(val)}`} value={val} depth={depth + 1} />
        ))}
        {!isArray && Object.keys(value).map((k) => (
          <JsonRow key={k} property={k} value={value[k]} depth={depth + 1} />
        ))}
      </div>
      )}
      {expanded && (
      <div style={styles.close(depth + 1)}>
        {bracket.close}
        {!root && <span>,</span>}
      </div>
      )}
    </>
  );
}

JsonRow.propTypes = {
  value: PropTypes.any,
  property: PropTypes.string,
  depth: PropTypes.number,
  root: PropTypes.bool,
};

JsonRow.defaultProps = {
  property: null,
  depth: 0,
  value: null,
  root: false,
};

export default function JsonViewer({ json }) {
  let obj = json;
  if (typeof json === 'string') {
    try {
      obj = JSON.parse(json);
    } catch {
      return <div>{json}</div>;
    }
  } else {
    try {
      JSON.stringify(json);
    } catch {
      //  We don't want to continue if this object contains circular reference
      return <></>;
    }
  }

  return <JsonRow value={obj} depth={0} root />;
}

JsonViewer.propTypes = {
  json: PropTypes.any,
};

JsonViewer.defaultProps = {
  json: null,
};
