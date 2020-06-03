import React from 'react';
import { renderRoutes } from 'react-router-config';

export const AppRoute = (props: any) => {
  return (
    <section>
      {renderRoutes(props.route.routes)}
    </section>
  )
}

export default AppRoute;
