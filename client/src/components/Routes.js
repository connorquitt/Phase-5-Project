import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Owners from './owner/Owners';
import Workers from './worker/Workers';
import GroomerHomePage from './groomer/GroomerHomePage';
import PetInfo from './owner/PetMoreInfo';
import Login from './Login';
import Signup from './Signup';

import Need from './StillNeed.js';
import PastJobs from './owner/PastJobs.js';
import PastAppointments from './owner/PastAppointments.js';
import GroomerList from './groomer/GroomerList.js'

const Routes = ({ isLoggedIn, setCurrentUser, handleLogin }) => {
    return (
        <Switch>
            <Route path="/owners">
                {isLoggedIn ? <Owners /> : <Redirect to="/login" />}
            </Route>
            <Route path="/workers">
                {isLoggedIn ? <Workers /> : <Redirect to="/login" />}
            </Route>
            <Route path="/groomers/:id">
                {isLoggedIn ? <GroomerHomePage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/groomers">
                {isLoggedIn ? <GroomerList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/pet/:id">
                {isLoggedIn ? <PetInfo /> : <Redirect to="/login" />}
            </Route>
            <Route path="/appointments">
                {isLoggedIn ? <PastAppointments /> : <Redirect to="/login" />}
            </Route>
            <Route path="/jobs">
                {isLoggedIn ? <PastJobs /> : <Redirect to="/login" />}
            </Route>
            <Route path="/signup">
                <Signup setCurrentUser={setCurrentUser}/>
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
