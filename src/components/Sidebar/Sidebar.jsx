import React from 'react';
import { Link } from 'react-router-dom';
import { BtnType } from 'src/constants/enum.constants';
import '../../styles/style.css';
import { AppButton } from '../AppButtons';
import { CgClose } from 'react-icons/cg';
const Sidebar = (props) => {
  return (
    <div style={props.style} className="side-bar-container">
      <NavItem name={'Home'} navigateTo={''} active={true} />
      <NavItem name={'About'} navigateTo={''} />
      <NavItem name={'Home'} navigateTo={''} />
      <AppButton type={BtnType.LIGHT} style={styles.closeBtn} onClick={props.onClose}>
        <CgClose style={{ fontWeight: 'bold', fontSize: '32px' }} />
      </AppButton>
    </div>
  );
};
const NavItem = (props) => {
  return (
    <Link
      style={props.style}
      className={props.active ? 'nav-item-container nav-item-active' : 'nav-item-container'}
      to={props.navigateTo}
    >
      {props.children || props.name}
    </Link>
  );
};
const styles = {
  closeBtn: {
    color: 'var(--light)',
    backgroundColor: 'var(--transparent',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
};
export { Sidebar, NavItem };
