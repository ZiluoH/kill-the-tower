import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import MapContainer from "./map/map_container";
import PlayContainer from "../components/play/play_container";


const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exect path="/play" component={PlayContainer} />
      <Route exact path="/map/:id" component={MapContainer} />
    </Switch>
  </div>
);

export default App;