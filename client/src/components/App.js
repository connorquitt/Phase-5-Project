import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Owners from './Owners';
import Workers from './Workers';
import Groomers from './Groomers';
import UserContext from './UseContext';



function App() {
    const [currentUser, setCurrentUser] = useState(null);
    console.log(currentUser)

    if (!currentUser) {
        console.log('logging user out')
        return <Login setCurrentUser={setCurrentUser} />
    } else {
        return (
            <UserContext.Provider value={{currentUser}}>
            <Router>
                <Switch>
                    <Route path="/owners">
                        <Owners/>
                    </Route>
                    <Route path="/workers">
                        <Workers />
                    </Route>
                    <Route path="/groomers">
                        <Groomers />
                    </Route>
                    <Route path="/">
                        <Login setCurrentUser={setCurrentUser}/>
                    </Route>
                </Switch>
            </Router>
            </UserContext.Provider>
        );
    }
}

export default App;