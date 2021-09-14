import { useState } from 'react';
import PropTypes from 'prop-types';
import ResponseHeader from './ResponseHeader';
import ResponseBody from './ResponseBody';

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

function HeaderButton({ label, isActive, clickHandler }) {
  const raiseClickEvent = () => {
    clickHandler(label);
  };

  return (
    <button type="button" style={styles.headerBtn(isActive)} onClick={raiseClickEvent}>{label}</button>
  );
}

HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

const HEADER = 'Header';
const BODY = 'Body';

export default function ResponsePanel() {
  const [activeTab, setActiveTab] = useState(BODY);

  const switchTab = (tab) => {
    if (tab === activeTab) {
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div style={styles.tab}>
      <div style={styles.header}>
        <HeaderButton label={HEADER} isActive={activeTab === HEADER} clickHandler={switchTab} />
        <HeaderButton label={BODY} isActive={activeTab === BODY} clickHandler={switchTab} />
      </div>
      <div style={styles.items}>
        {activeTab === HEADER && <ResponseHeader />}
        {activeTab === BODY && <ResponseBody />}
      </div>
    </div>
  );
}
