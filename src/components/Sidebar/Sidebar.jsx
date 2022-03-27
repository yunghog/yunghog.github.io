import React from 'react';
import { BtnType } from 'src/constants/enum.constants';
import '../../styles/style.css';
import { AppButton } from '../AppButtons';
import { CgClose, CgMenuLeft } from 'react-icons/cg';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const Sidebar = (props) => {
  const path = useLocation();
  const activeLink = (hash) => {
    if ('#' + hash === path.hash) return true;
    else return false;
  };
  const navigateToTop = () => {
    window.scrollTo({ top: 0, left: 0, behaviour: 'smooth' });
    props.onClose();
  };
  return (
    <div ref={props.domref} style={props.style} className="side-bar-container">
      <NavItem name={'Home'} navigateTo={''} active={activeLink('')} onClick={navigateToTop} />
      <NavItem
        name={'About'}
        navigateTo={'about'}
        onClick={props.onClose}
        active={activeLink('about')}
      />
      <NavItem
        name={'Projects'}
        navigateTo={'projects'}
        onClick={props.onClose}
        active={activeLink('projects')}
      />
      <NavItem
        name={'Process'}
        navigateTo={'process'}
        onClick={props.onClose}
        active={activeLink('process')}
      />
      <NavItem
        name={'Contact'}
        navigateTo={'contact'}
        onClick={props.onClose}
        active={activeLink('contact')}
      />
      <AppButton type={BtnType.LIGHT} style={styles.closeBtn} onClick={props.onClose}>
        <CgClose style={{ fontWeight: 'bold', fontSize: '32px' }} />
      </AppButton>
    </div>
  );
};
const NavItem = (props) => {
  return (
    <a
      style={props.style}
      className={props.active ? 'nav-item-container nav-item-active' : 'nav-item-container'}
      href={'#' + props.navigateTo}
      onClick={props.onClick}
    >
      {props.children || props.name}
    </a>
  );
};
const MenuButton = (props) => {
  return (
    <button onClick={props.onClick} style={{ ...styles.menuBtn, ...props.style }}>
      <CgMenuLeft />
    </button>
  );
};
const styles = {
  closeBtn: {
    color: 'var(--light)',
    backgroundColor: 'var(--transparent)',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  menuBtn: {
    color: 'var(--light)',
    backgroundColor: 'var(--red)',
    position: 'absolute',
    top: '0px',
    left: '30px',
    padding: '0px 5px 20px 5px',
    fontSize: '32px',
    zIndex: '15',
    border: 'none',
  },
};
export { Sidebar, NavItem, MenuButton };
