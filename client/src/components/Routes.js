import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Owners from './owner/Owners';
import Workers from './worker/Workers';
import Groomers from './groomer/Groomers';
import PetInfo from './owner/PetMoreInfo';
import Login from './Login';
import Signup from './Signup';

const Routes = ({ isLoggedIn, setCurrentUser, handleLogin }) => {
    return (
        <Switch>
            <Route path="/owners">
                {isLoggedIn ? <Owners /> : <Redirect to="/login" />}
            </Route>
            <Route path="/workers">
                {isLoggedIn ? <Workers /> : <Redirect to="/login" />}
            </Route>
            <Route path="/groomers">
                {isLoggedIn ? <Groomers /> : <Redirect to="/login" />}
            </Route>
            <Route path="/groomers/:id">
                {isLoggedIn ? <Groomers /> : <Redirect to="/login" />}
            </Route>
            <Route path="/pet/:id">
                {isLoggedIn ? <PetInfo /> : <Redirect to="/login" />}
            </Route>
            <Route path="/appointments">
                {isLoggedIn ? <Groomers /> : <Redirect to="/login" />}
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/login">
                {isLoggedIn ? <Redirect to="/owners" /> : <Login setCurrentUser={handleLogin} />}
            </Route>
            <Route path="/">
                {isLoggedIn ? <Redirect to="/owners" /> : <Redirect to="/login" />}
            </Route>
        </Switch>
    );
};

export default Routes;
