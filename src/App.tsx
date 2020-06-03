import React from 'react';
import { renderRoutes } from 'react-router-config';

export const AppRoute = (props: any) => {
  return (
    <>
      {renderRoutes(props.route.routes)}
    </>
  )
}

export default AppRoute;
