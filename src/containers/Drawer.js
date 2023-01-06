import { useState } from 'react';
import styles from '../assets/css/Drawer.module.css';
import logo from '../assets/images/http.png';
import SavedSites from '../components/SavedSites';

export default function Drawer() {
  const [open, setOpen] = useState(false);
  let headerStyle = styles.header;
  let drawerStyle = styles.drawer;
  let hamburgerStyle = styles.hamburger;
  if (open) {
    headerStyle = `${headerStyle} ${styles.open}`;
    drawerStyle = `${drawerStyle} ${styles.open}`;
    hamburgerStyle = `${hamburgerStyle} ${styles.open}`;
  }

  const handburgerClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container}>
      <div className={headerStyle}>
        {open ? <div className={styles.logoWrap}><img src={logo} width={30} alt="logo" /></div> : null}
        <button className={hamburgerStyle} type="button" onClick={handburgerClick}>
          <span />
        </button>
      </div>
      <div className={drawerStyle}>
        <SavedSites />
      </div>
    </div>
  );
}
