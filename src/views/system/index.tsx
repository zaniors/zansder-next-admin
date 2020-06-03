import React from 'react';
import { renderRoutes } from "react-router-config";
import { useLocation, Redirect } from 'react-router-dom';

const SystemRoute = (props: any) => {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/system' && <Redirect to={'/system/users'} />}
      {renderRoutes(props.route.routes)}
    </>
  )
};

export default SystemRoute;