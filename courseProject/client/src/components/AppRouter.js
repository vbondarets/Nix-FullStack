import React, { useContext } from 'react';
import {Route, Redirect, Switch} from 'react-router-dom'
import { Context } from '..';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => {
    const {user} = useContext(Context)
  return (
    <Switch>
        {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key= {path} path={path} component = {Component} exact />
        )}
        {publicRoutes.map(({path, Component}) =>
            <Route key= {path} path={path} component = {Component} exact />
        )}
        <Redirect to={SHOP_ROUTE}/>
    </Switch>
  )
}

export default AppRouter