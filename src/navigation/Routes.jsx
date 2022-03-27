import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MenuButton, Sidebar } from 'src/components';
import { AppFooter } from 'src/components/Footer';
import { HomeView } from 'src/views';
const AppRouter = () => {
  const sidebar = useRef(null);
  const openMenu = () => {
    sidebar.current.style.width = window.innerWidth > 768 ? '40%' : '100%';
    sidebar.current.style.transform = 'translateX(0px)';
    sidebar.current.style.opacity = '1';
  };
  const closeMenu = () => {
    sidebar.current.style.width = '0px';
    sidebar.current.style.transform = 'translateX(-80px)';
    sidebar.current.style.opacity = '0';
  };
  useEffect(() => {
    closeMenu();
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Sidebar domref={sidebar} onClose={() => closeMenu()} />
          <MenuButton onClick={() => openMenu()} />
          <HomeView />
          <AppFooter />
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
