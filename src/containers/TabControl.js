import { useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
  tab: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
  },
  items: {
    flex: 1,
  },
  headerBtn: (isActive) => ({
    outline: 'none',
    border: '1px solid #ddd',
    padding: '8px 20px',
    cursor: 'pointer',
    color: isActive ? '#fff' : 'inherit',
    backgroundColor: isActive ? '#62b5e5' : 'transparent',
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
