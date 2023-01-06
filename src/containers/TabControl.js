import { useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
  tab: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  headerBorder: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    borderBottom: '1px solid #62b5e5',
  },
  items: {
    flex: 1,
  },
  headerBtn: (isActive) => ({
    position: 'relative',
    outline: 'none',
    border: `1px solid ${isActive ? '#62b5e5' : '#eee'}`,
    borderBottomColor: isActive ? '#fff' : '#62b5e5',
    padding: '8px 20px',
    cursor: 'pointer',
    color: isActive ? '#62b5e5' : 'inherit',
    backgroundColor: 'transparent',
  }),
};

function Header({ label, isActive, clickHandler }) {
  const raiseClickEvent = () => {
    clickHandler(label);
  };

  return (
    <button type="button" style={styles.headerBtn(isActive)} onClick={raiseClickEvent}>{label}</button>
  );
}

Header.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default function TabControl({
  activeHeader, headers, items, panelStyle,
}) {
  const [activeTab, setActiveTab] = useState(activeHeader || headers[0]);

  const switchTab = (tab) => {
    if (tab === activeTab) {
      return;
    }
    setActiveTab(tab);
  };

  let itemStyle = styles.items;
  if (panelStyle) {
    itemStyle = { ...panelStyle, ...styles.items };
  }

  return (
    <div style={styles.tab}>
      <div style={styles.header}>
        <div style={styles.headerBorder} />
        {headers.map(
          (h) => <Header key={h} label={h} isActive={activeTab === h} clickHandler={switchTab} />,
        )}
      </div>
      <div style={itemStyle}>
        {items[headers.indexOf(activeTab)]}
      </div>
    </div>
  );
}

TabControl.propTypes = {
  activeHeader: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  /* eslint-disable react/forbid-prop-types */
  panelStyle: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
};

TabControl.defaultProps = {
  activeHeader: null,
  panelStyle: null,
};
