import { useState } from 'react';
import styles from '../assets/css/Drawer.module.css';
import UserSnippets from '../components/UserSnippets';
import RequestHeader from '../components/RequestHeader';

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
        {/* eslint-disable-next-line */}
        <button className={hamburgerStyle} type="button" onClick={handburgerClick}><span /></button>
      </div>
      <div className={drawerStyle}>
        <RequestHeader />
        <UserSnippets />
      </div>
    </div>
  );
}
