import React from 'react';
import { renderRoutes } from 'react-router-config';
import RouterGuard from './router/guard';


export const AppRoute = (props: any) => {
  console.log('count', props)
  return (
    <RouterGuard>
      {renderRoutes(props.route.routes)}
    </RouterGuard>
  )
}

export default AppRoute;
