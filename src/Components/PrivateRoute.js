import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Consumer>
        {({ isLoggedIn }) => (
            <Route render={props =>
                (isLoggedIn === true) ?
                    <Component {...props} /> :
                    <Redirect to="/sign-in" />}
                {...rest} />)}
    </Consumer>
)

export default PrivateRoute;