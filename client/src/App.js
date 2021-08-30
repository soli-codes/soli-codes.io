import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import CreateProfile from './components/profile-forms/CreateProfile';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Blog from './components/Blog/Blog';
import { Toolbox } from './components/Toolbox/Toolbox';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Fragment>
                    <Route exact path='/' component={Landing} />
                    <section>
                        <Alert />
                        <Switch>
                            <Route exact path='/login' component={Login} />
                            <Route
                                exact
                                path='/profiles'
                                component={Profiles}
                            />
                            <Route exact path='/blog' component={Blog} />
                            <Route exact path='/toolbox' component={Toolbox} />
                            <Route
                                exact
                                path='/profile/:id'
                                component={Profile}
                            />
                            <Route
                                exact
                                path='/register/'
                                component={Register}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/edit-profile'
                                component={CreateProfile}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
