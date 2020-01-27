import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

import TweetsContainer from './tweets/tweets_container';
import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileContainer from './profile/profile_container';
import MapContainer from "./map/map_container";
import TweetComposeContainer from './tweets/tweet_compose_container';
import BattleContainer from './battle/battle_container';
import HandContainer from '../components/hand/hand_container';
import PlayContainer from "../components/play/play_container";
import Card from './card/card'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MainPageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route exect path="/play" component={PlayContainer} />
      <Route exact path="/map/:id" component={MapContainer} />
      <Route exact path="/battle" component={BattleContainer} />
      <Route exact path="/hand" component={HandContainer} />
      <Route exact path="/card" component={Card} />
      <ProtectedRoute exact path="/tweets" component={TweetsContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileContainer} />
      <ProtectedRoute exact path="/new_tweet" component={TweetComposeContainer} />
    </Switch>
  </div>
);

export default App;