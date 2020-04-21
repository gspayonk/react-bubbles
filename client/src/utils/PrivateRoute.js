import React from 'react';
import { Route, Redirect } from 'react-router';

//Build a PrivateRoute component and use it to protect a route that renders the BubblesPage component

const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render = {props => {
                if (localStorage.getItem('token')) {
                return <Component {...props} />;
                }

            return <Redirect to = '/' />;
            }}
        />
    );
};

export default PrivateRoute;
