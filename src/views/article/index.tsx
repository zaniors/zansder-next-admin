import React from 'react';
import { renderRoutes } from "react-router-config";
import { useLocation, Redirect } from 'react-router-dom';

const ArticleRoute = (props: any) => {
  const { pathname } = useLocation()

  return (
    <>
      {pathname === '/article' && <Redirect to={'/article/list'} />}
      {renderRoutes(props.route.routes)}
    </>
  )
};

export default ArticleRoute;