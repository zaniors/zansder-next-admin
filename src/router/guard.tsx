import React, { FC } from 'react';
import { useLocation, Redirect, Link } from 'react-router-dom';
import { isLogin } from '../utils/auth';

const RouterGuard: FC = (props) => {
  const { pathname } = useLocation();
  const renderMaps = () => {
    if (isLogin()) {
      switch (pathname) {
        case '/':
        case '/login':
          return <Redirect to="/home" />
        case '/article':
          return <Redirect to="/article/list" />;
      }
      return <Link to={pathname} />
    }

    return <Redirect to="/login" />;
  }

  return (
    <>
      {renderMaps()}
      {props.children}
    </>
  )
}

export default RouterGuard;